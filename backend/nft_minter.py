# import the OpenseaAPI object from the opensea module
from opensea import OpenseaAPI

# create an object to interact with the Opensea API (need an api key)
api = OpenseaAPI(apikey="4cbadf7bdbff41aaa2b3b46b0c468e74")

# fetch a single asset
contract_address = "0x495f947276749Ce646f68AC8c248420045cb7b5e"
token_id = "93478729683723419007047079989949114255691551576804525283770076826191492284417"
result = api.asset(asset_contract_address=contract_address, token_id=token_id)

# fetch multiple assets
# result = api.assets(owner="0xcEab1607035cf8c22D3a576e0f96Fe0E45615ba2", limit=3)

# # fetch a single contract
# result = api.contract(asset_contract_address="0x495f947276749Ce646f68AC8c248420045cb7b5e")

# # fetch a single collection
# result = api.collection(collection_slug="cryptopunks")

# # fetch multiple collections
# result = api.collections(asset_owner="0xce90a7949bb78892f159f428d0dc23a8e3584d75", limit=3)

# # fetch collection stats
# result = api.collection_stats(collection_slug="cryptopunks")

# fetch multiple events
from opensea import utils as opensea_utils

period_end = opensea_utils.datetime_utc(2021, 11, 6, 14, 30)
result = api.events(
    occurred_before=period_end,
    limit=10,
    export_file_name="events.json",
)

# fetch multiple bundles
result = api.bundles(limit=2)

# paginate the events endpoint (cursors are handled internally)
from datetime import datetime, timezone

start_at = datetime(2021, 10, 5, 3, 25, tzinfo=timezone.utc)
finish_at = datetime(2021, 10, 5, 3, 20, tzinfo=timezone.utc)

event_generator = api.events_backfill(start=start_at,
                                      until=finish_at,
                                      event_type="successful")
for event in event_generator:
    if event is not None:
        print(event) # or do other things with the event data