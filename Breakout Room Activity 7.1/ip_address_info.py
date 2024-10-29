import requests

def get_ip():
    try:
        response = requests.get('https://api.ipify.org?format=json')
        response.raise_for_status()  
        return response.json()["ip"]
    except requests.exceptions.RequestException as e:
        print(f"Error fetching IP address: {e}")
        return None

def get_location():
    ip_address = get_ip()
    if ip_address:
        try:
            response = requests.get(f'https://ipapi.co/{ip_address}/json/')
            response.raise_for_status() 
            
            location_data = response.json()  
            
            formatted_location_data = {
                "IPv4 Address": ip_address,
                "City": location_data.get("city", "N/A"),
                "Region": location_data.get("region", "N/A"),
                "Country": location_data.get("country_name", "N/A"),
            }
            return formatted_location_data
        except requests.exceptions.RequestException as e:
            print(f"Error fetching location data: {e}")
            return None
    return None

if __name__ == "__main__":
    location_info = get_location()
    if location_info:
        print("The user's IPv4 address and current location is as follows:")
        for key, value in location_info.items():
            print(f"{key}: {value}")
