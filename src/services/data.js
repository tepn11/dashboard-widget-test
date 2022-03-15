export function getData() {
    return fetch('https://w4m9n4r9.stackpathcdn.com/frontend-test-data.json')
      .then(data => data.json())
      .catch((err) => {
        console.error('Error', err);
        return null;
    });
  }