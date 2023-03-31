# Installation et l'exécution du projet

Ce ReadMe contient des instructions pour cloner le projet, installer les dépendances nécessaires, configurer la base de données avec Docker, configurer le mail et exécuter le projet.

## Étapes à suivre

1. Cloner le projet en utilisant la commande suivante dans un terminal :

```bash
git clone https://github.com/JeremyNght/iut-encrypt.git
```

2. Dans un terminal, accédez au dossier du projet et exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

3. Créez un fichier .env à la racine du projet et ajoutez-y les informations suivantes :

```bash
API_KEY=api-key

DB_HOST=host
DB_USER=username
DB_PASSWORD=password
DB_DATABASE=name

MAIL_HOST=host
MAIL_PORT=port
MAIL_USER=sender
MAIL_PASS=password
```

4. Pour la base de données, utilisez Docker en exécutant la commande suivante dans un terminal :

```bash
docker run -p 3306:3306 --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -d mysql:5
```

Cette commande va créer un conteneur Docker contenant une instance de la base de données MySQL version 5. Le conteneur sera nommé hapi-mysql, et les paramètres MYSQL_ROOT_PASSWORD et MYSQL_DATABASE sont définis respectivement comme "hapi" et "user".

5. Pour configurer le service mail, rendez-vous sur https://ethereal.email/ et créez un nouveau compte.

6. Dans le terminal dans le dossier du projet, exécutez la commande suivante pour lancer le serveur :

```bash
npm start
```

7. Ouvrez votre navigateur et rendez-vous à l'adresse http://localhost:3000/documentation pour tester l'API.

## Conclusion

Le projet devrait maintenant être configuré et en cours d'exécution. Vous pouvez maintenant tester l'API en utilisant l'interface utilisateur de Swagger UI en accédant à http://localhost:3000/documentation.