console.log('hi');

async function logMovies() {
  const response = await fetch(
    'http://localhost:1337/customer/auth?redirectUrl=http://localhost:3000/authcallback'
  );
  const result = await response.json();
  console.log(result);
}
logMovies();
