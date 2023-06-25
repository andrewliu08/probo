from diffusers import UNet2DModel
from diffusers import DDPMPipeline
from diffusers import DDPMScheduler

import hashlib
import random
import torch
import numpy as np


class TrainingConfig:
    inference_steps = 1000
    image_size = 128  # the generated image resolution # 128 for production
    train_batch_size = 64
    eval_batch_size = 16  # how many images to sample during evaluation
    num_epochs = 1
    gradient_accumulation_steps = 1
    learning_rate = 1e-4
    lr_warmup_steps = 500
    save_image_epochs = 1
    save_model_epochs = 1
    mixed_precision = "fp16"  # `no` for float32, `fp16` for automatic mixed precision
    output_dir = "probo/results"  # the model name locally and on the HF Hub
    trained_path = "diffusion_pytorch_model.bin"

    push_to_hub = False  # whether to upload the saved model to the HF Hub
    hub_private_repo = False
    overwrite_output_dir = True  # overwrite the old model when re-running the notebook
    seed = 0
    
    avatar_path = "your_token.png"

config = TrainingConfig()

def make_model():
    return UNet2DModel(
        sample_size=config.image_size,  # the target image resolution
        in_channels=3,  # the number of input channels, 3 for RGB images
        out_channels=3,  # the number of output channels
        layers_per_block=2,  # how many ResNet layers to use per UNet block
        block_out_channels=(128, 128, 256, 256, 512, 512),  # the number of output channels for each UNet block
        down_block_types=(
            "DownBlock2D",  # a regular ResNet downsampling block
            "DownBlock2D",
            "DownBlock2D",
            "DownBlock2D",
            "AttnDownBlock2D",  # a ResNet downsampling block with spatial self-attention
            "DownBlock2D",
        ),
        up_block_types=(
            "UpBlock2D",  # a regular ResNet upsampling block
            "AttnUpBlock2D",  # a ResNet upsampling block with spatial self-attention
            "UpBlock2D",
            "UpBlock2D",
            "UpBlock2D",
            "UpBlock2D",
        )
    )

def load_model(trained_path):
    model = make_model()
    model.load_state_dict(torch.load(trained_path, map_location='cpu'))
    model.eval()
    return model

def gen_to_avatar(model, generator):
    scheduler = DDPMScheduler(num_train_timesteps=config.inference_steps)
    pipeline = DDPMPipeline(unet=model, scheduler=scheduler)
        
    avatar = pipeline(batch_size=1,
                    generator=generator,
                    num_inference_steps=config.inference_steps,
                    ).images
        
    return avatar[0]

# end-to-end function
def hash_to_avatar(seed_str, trained_path):
    # encode the string
    seed_str = seed_str.encode('utf-8')

    # create the generator
    hash_object = hashlib.md5(seed_str)
    hash_string = hash_object.hexdigest()

    seed = int (hash_string, 16)
    seed = seed % (2**31 - 1)
    generator = torch.manual_seed(seed)
    random.seed(seed)
    np.random.seed(seed)
    torch.cuda.manual_seed(seed)
        
    # load the model
    model = load_model(trained_path=trained_path)

    # return avatar
    avatar = gen_to_avatar(model, generator)

    # save the avatar as a PNG
    avatar.save(config.avatar_path, "PNG")

    # return path to PNG
    return config.avatar_path
