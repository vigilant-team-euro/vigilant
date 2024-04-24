import pandas as pd
from firebase_admin import credentials, firestore, initialize_app
from prophet import Prophet
import math
import json

#cred = credentials.Certificate("config\\firebaseConfig.json")
#initialize_app(cred)
db = firestore.client()

def fetch_data_from_firebase(user_id: str, store_id: str):
    # Reference to the collection
    collection_ref = db.collection('users').document(user_id).collection('stores').document(store_id).collection('data')
    
    # List to store frames from all documents
    frames_data = []
    
    # Iterate over documents in the collection
    for doc in collection_ref.stream():
        # Get data from each document
        data = doc.to_dict()
        # Extract 'frames' field and append to the list
        frames_data.extend(data.get('frames', []))
    
    # Convert the list of dictionaries into a DataFrame
    df = pd.DataFrame(frames_data)
    
    return df
def preprocess_data(df):
    # Convert 'start_date' to datetime object
    df['start_date'] = pd.to_datetime(df['start_date'])

    # Extract date from start_date
    df['date'] = df['start_date'].dt.date
    
    return df

def calculate_average_age_and_gender(df):
    # Group by date and calculate average age
    grouped_data = df.groupby('date', as_index=False)['0-15_age_count'].mean()
    age_fifteen = df.groupby('date', as_index=False)['15-30_age_count'].mean()
    age_thirty = df.groupby('date', as_index=False)['30-45_age_count'].mean()
    age_fourtyfive = df.groupby('date', as_index=False)['45-60_age_count'].mean()
    grouped_data = grouped_data.merge(age_fifteen, on='date', how='left')
    grouped_data = grouped_data.merge(age_thirty, on='date', how='left')
    grouped_data = grouped_data.merge(age_fourtyfive, on='date', how='left')

    # Calculate male and female counts separately
    male_counts = df.groupby('date', as_index=False)['male_count'].mean()
    female_counts = df.groupby('date', as_index=False)['female_count'].mean()
    
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

def forecast_age_zero(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '0-15_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 7 days
    return forecast[['ds', 'yhat']][-7:]
def forecast_age_fifteen(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '15-30_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 7 days
    return forecast[['ds', 'yhat']][-7:]
def forecast_age_thirty(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 7 days
    return forecast[['ds', 'yhat']][-7:]
def forecast_age_fourtyfive(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=False, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 7 days
    future = model.make_future_dataframe(periods=7)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 7 days
    return forecast[['ds', 'yhat']][-7:]
def forecast_male_count_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'male_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted male count for the next 30 days
    return forecast[['ds', 'yhat']][-30:]

def forecast_female_count_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'female_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted female count for the next 30 days
    return forecast[['ds', 'yhat']][-30:]

def forecast_age_zero_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '0-15_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 30 days
    return forecast[['ds', 'yhat']][-30:]

def forecast_age_fifteen_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '15-30_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 30 days
    return forecast[['ds', 'yhat']][-30:]

def forecast_age_thirty_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 30 days
    return forecast[['ds', 'yhat']][-30:]

def forecast_age_fourtyfive_thirty_day(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=False)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 30 days
    future = model.make_future_dataframe(periods=30)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 30 days
    return forecast[['ds', 'yhat']][-30:]
def forecast_male_count_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'male_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted male count for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def forecast_female_count_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', 'female_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted female count for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def forecast_age_zero_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '0-15_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def forecast_age_fifteen_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '15-30_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def forecast_age_thirty_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def forecast_age_fourtyfive_yearly(df):
    # Create a Prophet model
    model = Prophet(seasonality_mode='additive', weekly_seasonality=True, yearly_seasonality=True)
    
    # Rename columns as required by Prophet
    df = df.rename(columns={'date': 'ds', '30-45_age_count': 'y'})
    
    # Fit the model
    model.fit(df[['ds', 'y']])
    
    # Make future dataframe for next 365 days
    future = model.make_future_dataframe(periods=365)
    
    # Make predictions
    forecast = model.predict(future)
    
    # Return only the forecasted age for the next 365 days
    return forecast[['ds', 'yhat']][-365:]

def floor_male_female_counts(df):
    # Floor the male and female counts
    df['yhat'] = df['yhat'].apply(round)
    df['yhat'] = df['yhat'].apply(lambda x: max(0, round(x)))
    return df

def forecast(user_id, store_id):
    store_data = {}
    df = fetch_data_from_firebase(user_id, store_id)
    print(df)
    if not df.empty:
        # Preprocess data
        df = preprocess_data(df)



        # Calculate average age and gender for the store
        grouped_data = calculate_average_age_and_gender(df)
        
        forecast_male_count_data = floor_male_female_counts(forecast_male_count(grouped_data))
        forecast_female_count_data = floor_male_female_counts(forecast_female_count(grouped_data))
        # forecast_age_zero_data = floor_male_female_counts(forecast_age_zero_data(grouped_data))
        # forecast_age_zero_data_thirty_day = floor_male_female_counts(forecast_age_zero_data_thirty_day(grouped_data))
        # forecast_age_zero_data_yearly = floor_male_female_counts(forecast_age_zero_data_yearly(grouped_data))
        # forecast_age_fifteen_data = floor_male_female_counts(forecast_age_fifteen_data(grouped_data))
        # forecast_age_fifteen_data_thirty_day = floor_male_female_counts(forecast_age_fifteen_data_thirty_day(grouped_data))
        # forecast_age_fifteen_data_yearly = floor_male_female_counts(forecast_age_fifteen_data_yearly(grouped_data))
        # forecast_age_thirty_data = floor_male_female_counts(forecast_age_thirty_data(grouped_data))
        # forecast_age_thirty_data_thirty_day = floor_male_female_counts(forecast_age_thirty_data_thirty_day(grouped_data))
        # forecast_age_thirty_data_yearly = floor_male_female_counts(forecast_age_thirty_data_yearly(grouped_data))
        # forecast_age_fourtyfive_data = floor_male_female_counts(forecast_age_fourtyfive_data(grouped_data))
        # forecast_age_fourtyfive_data_thirty_day = floor_male_female_counts(forecast_age_fourtyfive_data_thirty_day(grouped_data))
        # forecast_age_fourtyfive_data_yearly = floor_male_female_counts(forecast_age_fourtyfive_data_yearly(grouped_data))



        forecast_age_zero_data = forecast_age_zero(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_zero'})
        forecast_age_fifteen_data = forecast_age_fifteen(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fifteen'})
        forecast_age_thirty_data = forecast_age_thirty(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_thirty'})
        forecast_age_fourtyfive_data = forecast_age_fourtyfive(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fourtyfive'})
        forecast_male_count_data_thirty_day = floor_male_female_counts(forecast_male_count_thirty_day(grouped_data))
        forecast_female_count_data_thirty_day = floor_male_female_counts(forecast_female_count_thirty_day(grouped_data))
        forecast_age_zero_data_thirty_day = forecast_age_zero_thirty_day(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_zero'})
        forecast_age_fifteen_data_thirty_day = forecast_age_fifteen_thirty_day(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fifteen'})
        forecast_age_thirty_data_thirty_day = forecast_age_thirty_thirty_day(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_thirty'})
        forecast_age_fourtyfive_data_thirty_day = forecast_age_fourtyfive_thirty_day(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fourtyfive'})
        forecast_male_count_data_yearly = floor_male_female_counts(forecast_male_count_yearly(grouped_data))
        forecast_female_count_data_yearly = floor_male_female_counts(forecast_female_count_yearly(grouped_data))
        forecast_age_zero_data_yearly = forecast_age_zero_yearly(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_zero'})
        forecast_age_fifteen_data_yearly = forecast_age_fifteen_yearly(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fifteen'})
        forecast_age_thirty_data_yearly = forecast_age_thirty_yearly(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_thirty'})
        forecast_age_fourtyfive_data_yearly = forecast_age_fourtyfive_yearly(grouped_data).rename(columns={'ds': 'date', 'yhat': 'forecast_age_fourtyfive'})





        forecast_male_count_data = forecast_male_count_data.rename(columns={'ds': 'date', 'yhat': 'forecast_male_visitor'})
        forecast_female_count_data = forecast_female_count_data.rename(columns={'ds': 'date', 'yhat': 'forecast_female_visitor'})
        forecast_male_count_data_thirty_day = forecast_male_count_data_thirty_day.rename(columns={'ds': 'date', 'yhat': 'forecast_male_visitor'})
        forecast_female_count_data_thirty_day = forecast_female_count_data_thirty_day.rename(columns={'ds': 'date', 'yhat': 'forecast_female_visitor'})
        forecast_male_count_data_yearly = forecast_male_count_data_yearly.rename(columns={'ds': 'date', 'yhat': 'forecast_male_visitor'})
        forecast_female_count_data_yearly = forecast_female_count_data_yearly.rename(columns={'ds': 'date', 'yhat': 'forecast_female_visitor'})



        grouped_data['date'] = grouped_data['date'].astype(str)
        forecast_age_zero_data_thirty_day['date'] = forecast_age_zero_data_thirty_day['date'].astype(str)
        forecast_age_fifteen_data_thirty_day['date'] = forecast_age_fifteen_data_thirty_day['date'].astype(str)
        forecast_age_thirty_data_thirty_day['date'] = forecast_age_thirty_data_thirty_day['date'].astype(str)
        forecast_age_fourtyfive_data_thirty_day['date'] = forecast_age_fourtyfive_data_thirty_day['date'].astype(str)
        forecast_age_zero_data['date'] = forecast_age_zero_data['date'].astype(str)
        forecast_age_fifteen_data['date'] = forecast_age_fifteen_data['date'].astype(str)
        forecast_age_thirty_data['date'] = forecast_age_thirty_data['date'].astype(str)
        forecast_age_fourtyfive_data['date'] = forecast_age_fourtyfive_data['date'].astype(str)
        forecast_age_zero_data_yearly['date'] = forecast_age_zero_data_yearly['date'].astype(str)
        forecast_age_fifteen_data_yearly['date'] = forecast_age_fifteen_data_yearly['date'].astype(str)
        forecast_age_thirty_data_yearly['date'] = forecast_age_thirty_data_yearly['date'].astype(str)
        forecast_age_fourtyfive_data_yearly['date'] = forecast_age_fourtyfive_data_yearly['date'].astype(str)

        forecast_male_count_data_thirty_day['date'] = forecast_male_count_data_thirty_day['date'].astype(str)
        forecast_female_count_data_thirty_day['date'] = forecast_female_count_data_thirty_day['date'].astype(str)
        forecast_male_count_data['date'] = forecast_male_count_data['date'].astype(str)
        forecast_female_count_data['date'] = forecast_female_count_data['date'].astype(str)
        forecast_male_count_data_yearly['date'] = forecast_male_count_data_yearly['date'].astype(str)
        forecast_female_count_data_yearly['date'] = forecast_female_count_data_yearly['date'].astype(str)


        # Store the grouped data and forecast for the store in the dictionary
        store_data[store_id] = {
            'grouped_data': grouped_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_zero': forecast_age_zero_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_fifteen': forecast_age_fifteen_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_thirty': forecast_age_thirty_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_fourtyfive': forecast_age_fourtyfive_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries

            'forecast_male_count': forecast_male_count_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_female_count': forecast_female_count_data.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            
            'forecast_age_zero_thirty': forecast_age_zero_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_fifteen_thirty': forecast_age_fifteen_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_thirty_thirty': forecast_age_thirty_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_age_fourtyfive_thirty': forecast_age_fourtyfive_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries

            'forecast_male_count_thirty': forecast_male_count_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries
            'forecast_female_count_thirty': forecast_female_count_data_thirty_day.to_dict(orient='records'),  # Convert DataFrame to list of dictionaries


            'forecast_age_zero_yearly': forecast_age_zero_data_yearly.to_dict(orient='records'),
            'forecast_age_fifteen_yearly': forecast_age_fifteen_data_yearly.to_dict(orient='records'),
            'forecast_age_thirty_yearly': forecast_age_thirty_data_yearly.to_dict(orient='records'),
            'forecast_age_fourtyfive_yearly': forecast_age_fourtyfive_data_yearly.to_dict(orient='records'),
            'forecast_male_count_yearly': forecast_male_count_data_yearly.to_dict(orient='records'),
            'forecast_female_count_yearly': forecast_female_count_data_yearly.to_dict(orient='records')
        }
    
    store_data_json = json.dumps(store_data)
    return store_data_json

