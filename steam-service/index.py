# Default Libraries
import json
import requests
from time import sleep

# PyPi packages
from quart_cors import cors
from quart import Quart, request, jsonify

STEAM_API = 'https://store.steampowered.com/api/appdetails?appids='
TIME_INTERVAL = 0.69

app = Quart(__name__) 
app = cors(app, allow_origin='*')

neededFields = ['price_overview', 'is_free', 'package_groups']

def sanitizeResponse(appid: str, gameInfo: dict) -> dict:
    sanitizedResponse = {'appid': appid}
        
    if not gameInfo['success']:
        sanitizedResponse['success'] = False
        
    else:
        gameData = gameInfo['data']

        for field in neededFields:
            if field in gameData:
                sanitizedResponse[field] = gameData[field]

    return sanitizedResponse

@app.route('/', methods=['GET']) 
async def getSteamInfo() -> list:
    request_body = await request.get_data()
    
    parsedBody = json.loads(request_body)

    appids = parsedBody['appids']

    responses = []

    for appid in appids:
        steamResponse = requests.get(STEAM_API + str(appid)).json()

        gameInfo = steamResponse[str(appid)]

        sanitizedResponse = sanitizeResponse(appid, gameInfo)
        
        responses.append(sanitizedResponse)

        if(appid != appids[-1]):
            sleep(TIME_INTERVAL)

    return jsonify(responses)

app.run()