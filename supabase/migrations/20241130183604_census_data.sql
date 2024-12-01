CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE census_data (
    id SERIAL PRIMARY KEY,
    tract_name VARCHAR(255) NOT NULL,
    state_code VARCHAR(2) NOT NULL,
    county_code VARCHAR(3) NOT NULL,
    tract_code VARCHAR(6) NOT NULL,
    population INTEGER NOT NULL,
    geometry GEOMETRY(POLYGON, 4326)
);