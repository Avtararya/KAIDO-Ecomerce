import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWE1NDdiZWM1NzZiZTI1MzU2ZjQwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDA4Nzg4MiwiZXhwIjoxNjUwMzQ3MDgyfQ.RTIQeYd7NuUwhEl5iBa7H1QInDMk5-EjW4zw6GO-Q6o';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
