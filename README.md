# Pokédex Project

This project both includes an API, as well as a web application coded in Vuejs.

For this project to work, you will need to clone the repository and install the required packages, as below :

```bash
mkdir Pokedex
cd Pokedex
git@github.com:EpitechDigitalPromo2026/D-POK-100-BDX_group-5.git
npm i
cd api
npm i
cd ../
cd pokedex
npm i
cd ../
```

Now that we are back in our root directory, we need to start the API and the project.

We can do this like so :

```bash
cd api
npm run start
```

This should start the API on the 1337 port, which is accessible by typing `http://localhost:1337` in your browser.

Next, we need to run the Vuejs project. Before that though, we will need to change the API url in the config file, to make sure the project is using our local API.

To do this, we should navigate to the `pokedex` folder like so :

```bash
cd ../
cd pokedex
cd src
code config.json
```

and then change the "apiURL" field to the correct URL.

Now that it is done, we can start the project such as below :

```bash
cd ../
npm run serve
```

If everything worked correctly, the project should have started !

You can now head to `http://localhost:8080` or whatever Vuejs' port is and you'll see the Pokédex in action !