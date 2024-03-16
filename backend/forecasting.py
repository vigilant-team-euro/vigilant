import pandas as pd
from firebase_admin import credentials, firestore, initialize_app
from prophet import Prophet
import math
import json

#cred = credentials.Certificate("config\\firebaseConfig.json")
#initialize_app(cred)
db = firestore.client()

def fetch_data_from_firebase(branch_name: str):
    persons = []
    docs = db.collection(branch_name).stream()
    for doc in docs:
        person_data = doc.to_dict()
        persons.append(person_data)

    # Create DataFrame from Firebase data
    df = pd.DataFrame(persons)
    return df

def fetch_names_from_firebase(branch_name: str):
    names = []  # Array to store names
    
    docs = db.collection(branch_name).stream()
    for doc in docs:
        person_data = doc.to_dict()
        names.append(person_data.get('name'))  # Assuming 'name' is the key for names, modify as per your data structure

    return names  # Return array of names

def preprocess_data(df):
    # Convert 'datetime' to datetime object
    df['datetime'] = pd.to_datetime(df['datetime'])

    # Group age into 10-year age groups
    df['age_group'] = pd.cut(df['age'], bins=range(0, 101, 10), right=False)
    
    # Extract date from datetime
    df['date'] = df['datetime'].dt.date
    
    return df

def calculate_average_age_and_gender(df):
    # Group by date and calculate average age
    grouped_data = df.groupby('date', as_index=False)['age'].mean()
    
    # Calculate male and female counts separately
    male_counts = df[df['gender'] == 'Man'].groupby('date').size().reset_index(name='male_count')
    female_counts = df[df['gender'] == 'Woman'].groupby('date').size().reset_index(name='female_count')
    
    # Merge male and female counts with the grouped data
    grouped_data = grouped_data.merge(male_counts, on='date', how='left')
    grouped_data = grouped_data.merge(female_counts, on='date', how='left')
    
    # Fill NaN values with 0
    grouped_data.fillna(0, inplace=True)
    
    return grouped_data


def forecast_male_count(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'male_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted male count for the next 7 days
    return forecast[['ds', 'yhat']][-7:]

def forecast_female_count(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'female_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted female count for the next 7 days
    return forecast[['ds', 'yhat']][-7:]

def forecast_age(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'age': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 7 days
    return forecast[['ds', 'yhat']][-7:]
def floor_male_female_counts(df):
    # Floor the male and female counts
    df['yhat'] = df['yhat'].apply(math.floor)
    return df

def forecast():
    branch_name = "stores" 
    names = fetch_names_from_firebase(branch_name)

    # Create a dictionary to store data for each store
    store_data = {}

    for name in names:
        if name is not None:
            df = fetch_data_from_firebase(name)
            if not df.empty:
                # Preprocess data
                df = preprocess_data(df)



                # Calculate average age and gender for the store
                grouped_data = calculate_average_age_and_gender(df)
                
                forecast_male_count_data = floor_male_female_counts(forecast_male_count(grouped_data))
                forecast_female_count_data = floor_male_female_counts(forecast_female_count(grouped_data))
                forecast_age_data = forecast_age(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age'})
                forecast_male_count_data = forecast_male_count_data.rename(columns={'ds': 'date', 'yhat': 'forecast_male_visitor'})
                forecast_female_count_data = forecast_female_count_data.rename(columns={'ds': 'date', 'yhat': 'forecast_female_visitor'})
                grouped_data['date'] = grouped_data['date'].astype(str)
                forecast_age_data['date'] = forecast_age_data['date'].astype(str)
                forecast_male_count_data['date'] = forecast_male_count_data['date'].astype(str)
                forecast_female_count_data['date'] = forecast_female_count_data['date'].astype(str)
                # Store the grouped data and forecast for the store in the dictionary
                store_data[name] = {
                    'grouped_data': grouped_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
                    'forecast_age': forecast_age_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
                    'forecast_male_count': forecast_male_count_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
                    'forecast_female_count': forecast_female_count_data.to_dict(orient='records')  # Convert DataFrame to list of dictionaries
                }
    
    store_data_json = json.dumps(store_data)
    return store_data_json

