import hashlib
import random
import torch

AVATAR_DIMS = [128, 128, 3]

def get_rand_tensor(seed_str, shape):
	hash_object = hashlib.md5(seed_str)
	hash_string = hash_object.hexdigest()

	seed = int (hash_string, 16)
	torch.manual_seed(seed)

	random_tensor = torch.randn(shape)
	return random_tensor

def get_rand_avatar(seed_str):
	noisy_image = get_rand_tensor(seed_str, AVATAR_DIMS)
	