const request = require('request-promise');

const image = async () => {
    const options = {
      url: 'https://coffee.alexflipnote.dev/random.json',
      headers: {
        Accept: 'application/json',
      },
    };
  
    try {
      const response = await request(options);
      const imageData = JSON.parse(response);
      return imageData.file;
    } catch (error) {
      console.error('Error fetching random coffee image', error);
      throw new Error('An error occurred while fetching the random coffee image. Please try again later.');
    }
  };

  const randomCoffee = async (req, res) => {
    try {
        const imageUrl = await image();
        res.status(200).json({ imageUrl });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
    };

module.exports = randomCoffee;

// Usage:
// randomCoffee().then((data) => console.log(data));
