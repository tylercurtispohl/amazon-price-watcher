# Welcome to Tyler's Amazon Price Watcher

Welcome to Tyler's Amazon Price Watcher. This project was created to satisfy an assignment given by ECFX for consideration for employment (thank you to the ECFX team for considering me). 

The app is hosted on AWS Amplify [here](https://main.d2vxw4o9kxswbk.amplifyapp.com/). Access to the hosted app is by invite only with auth provided by Clerk.com. If you are a member of the ECFX team, you should have received instructions on how to access the app. This is a full-stack serverless application that employs several AWS resources as well as SendGrid and Clerk.com authorization. So setting up a dev environment to run the application yourself is quite involved. But I will provide instructions on how to do so later in this document if you really want to.

In this document, I'll give an overview of the code and how the application works and then go over challenges faced and possible future extensions/modifications to the application.

## What the application does

At a high level, this application scans Amazon product pages every 5 minutes for price drops and sends emails to a list of subscriptions upon detecting a price drop. Products to be scanned and subscriptions to email notifications are configured in the UI. 

In the background, there are two AWS Lambdas that go through a list of configured products and send emails.

1. orchestrator - This lambda queries the database for all configured products and puts a message on a queue to be processed.
2. priceWatcher - this lambda watches the queue and upon receiving a message it scrapes the price from the given URL (to an Amazon product page). After getting the price, it sends initial notification emails (emails with the current price) to all subscriptions of a new product and all new subscriptions to the product. Upon detecting a price drop, it will send a price drop notification email to all subscriptions of the product that have received notifications in the past (i.e. it won't send price drop notifications to new subscriptions - they get an initial price email instead).

## Using Tyler's Amazon Price Watcher

Upon logging in to the application, you will be greeted with a dashboard that looks like this:

![dashboard](https://github.com/tylercurtispohl/amazon-price-watcher/assets/48455432/d8644fcc-62d4-438d-a3de-249853f67f41)

You can double click a row to view product details or click the "Create a product" button at the top right to be taken to a form where you can create a product to be monitored. *_Note: The application is ONLY able to scrape Amazon product pages for prices and its not guaranteed to work for all types of products (although it should work for most). The application will fail to process any other type of URL. For example, you can see in the screenshot that a product that was configured for example.com failed to process._*

Double clicking a product will take you to the product details page as shown in the screenshot below.

![product_details](https://github.com/tylercurtispohl/amazon-price-watcher/assets/48455432/742b6dd8-6461-4c6a-b71c-e940f6277dc5)

Here you can see a line chart representing the price over time. Below the chart, you can see the details of the product as well as a list of subscriptions. Next to the URL is buttons to copy or go to the URL. Similar to the table on the product page, you can double click a subscription to see its details. At the top right of the subscriptions list, there is a "Create a subscription" button which will take you to a form where you can subscribe to a product notification with an email address. After creating a new subscription, the subscribed email will receive an intitial price notification within 5 minutes - the next time the application checks the price of the product.

Double clicking a subscription in the table at the bottom of the product details page will take you to the subscription details page as shown below.

![subscription_details](https://github.com/tylercurtispohl/amazon-price-watcher/assets/48455432/df8ded6e-36a1-44bf-b183-897862eba3e3)

Here you can see a list of notifications sent and their type. In this screenshot, the given email received both an initial price notification and a price drop notification.

And that is the application end-to-end!

## The tech stack

### AWS Amplify and other AWS Resources

The application heavily utilizes [AWS Amplify](https://aws.amazon.com/amplify/?gclid=Cj0KCQjwwMqvBhCtARIsAIXsZpZ82n2aX8x0E-oYw00kHSONcOoboxkLjk-fOs3AkxANIFeRJyJ8_cUaAvAAEALw_wcB&trk=66d9071f-eec2-471d-9fc0-c374dbda114d&sc_channel=ps&ef_id=Cj0KCQjwwMqvBhCtARIsAIXsZpZ82n2aX8x0E-oYw00kHSONcOoboxkLjk-fOs3AkxANIFeRJyJ8_cUaAvAAEALw_wcB:G:s&s_kwcid=AL!4422!3!646025317188!e!!g!!aws%20amplify!19610918335!148058249160) for almost everything. Amplify was chosen because it gives us an all-in-one place to create and host everything needed for a full-stack application like this one. Despite how involved setting up a dev environment is, Amplify is fairly easy to use to create other AWS resources through CloudFormation in order to create small or prototype applications like this one. Amplify hosting and AWS Lambdas for serverless backend handles scaling up to a large number of users. It can also scale to larger projects although the larger the project, the longer build times are which can make the development process slow. It can also scale to much larger projects - I've used it on full-stack projects that create hundreds of lambdas and many other AWS resources. However, build and deploy times can get rather long with larger projects. So there may be better alternatives for large scale projects.

Amplify gives us the ability to create almost any AWS resource a project needs. In this project, it is used to create

* Hosting for the frontend application
* 2 Lambda functions
* DynamoDB database tables
* An AppSync GraphQL API that gives access to the database tables
* Generated TypeScript types for interacting with the AppSync API
* An SQS Queue for communication between Lambdas

One downside of Amplify that I found while doing this project is that it can push you out of the free tier of AWS just from deploying. This is because deployments make requests to and from S3 storage. S3 pricing gives you 2000 put, copy, post, or list requests on the free tier. During development, you'll find yourself deploying builds often and that racks up S3 requests fast. I had to actually create a 2 AWS accounts during development of this project to avoid spending any money (although it would probably only cost a few cents per month to continue with the project).

### DynamoDB and AppSync

As mentioned earlier, DynamoDB was chosen as the database simply because its so darn easy to set up with Amplify. You can connect a SQL database like Aurora to an Amplify application, but it is a little more difficult. So for a small application like this, DynamoDB with AppSync works well.

AppSync provides a simple to use GraphQL schema and API for creating database tables and interacting with them. It also gives us a relational database _feel_ even though it is backed by DynamoDB, a NOSQL database, in this instance.

### Next.js

The frontend application is built with [Next.js](https://nextjs.org/), a full-stack framework built on React for creating simple, dynamic applications. Next.js is fantastic for small and large projects and has a great developer experience in my opinion. I won't get into it too much here but if you're curious you can read more about the pros and cons [here](https://www.intuz.com/blog/5-reasons-why-you-should-use-next.js-for-your-front-end-development) and [here](https://pagepro.co/blog/pros-and-cons-of-nextjs/).

### Auth with Clerk

The only thing I did not use Amplify for is authentication. Amplify authentication works fine for Next.js but it can be tricky to set up. Rather than fiddling with Amplify auth, I opted to use [Clerk](https://clerk.com/) which is incredibly easy to set up and use in Next.js applications. Check out [the Next.js Quickstart guide](https://clerk.com/docs/quickstarts/nextjs) to see just how easy it is. Choosing Clerk.com rather than Amplify auth probably saved me a couple hours of precious development time.

### NextUI

The frontend uses a component library called [NextUI](https://nextui.org/). There wasn't a strong reason to choose this component library other than that I have used it before and liked it.

### Chart.js

The frontend also makes use of a library called [Chart.js](https://www.chartjs.org/) and a React component library built on it called [react-chartjs-2](https://react-chartjs-2.js.org/). This is used to render the price chart shown on the product details page.

## Code overview

### Backend

The backend includes 2 AWS Lambda functions: the orchestrator and the priceWatcher. The orchestrator function sends messages to a queue that the priceWatcher function then picks up and executes. The priceWatcher function needs to scrape the Amazon product page for the price and send emails. This can take around 750 mb of memory and up to 30 seconds to complete. This queueing architecture was created so that we could spin off multiple executions of the priceWatcher function to run concurrently. This way, we can process many (hundreds to thousands) of products very quickly.

#### orchestrator

The code for the orchestrator lambda can be found at [amplify/backend/function/orchestrator](https://github.com/tylercurtispohl/amazon-price-watcher/tree/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/orchestrator). In the src folder is an [index.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/orchestrator/src/index.js) file containing the handler function for the lambda. Here you can see that we call a function in [lib/dbClient.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/orchestrator/src/lib/dbClient.js) to get all products with the "CONFIGURED" status. For each product, we put a message on the priceWatcher queue which contains the product ID. That is it! That is all this lambda needs to do.

#### priceWatcher

The code for the priceWatcher lambda can be found at [amplify/backend/function/priceWatcher](https://github.com/tylercurtispohl/amazon-price-watcher/tree/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher). There is quite a bit more here than the orchestrator lambda. In the src folder is the [index.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/index.js) file containing the lambda handler function. In the src/lib folder, you'll see a few helper files:

* [dbClient.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/lib/dbClient.js) contains functions to interact with the AppSync GraphQL API for CRUD operations on the database.
* [emailHelper.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/lib/emailHelper.js) contains functions to send initial and new price notifications as emails using SendGrid.
* [priceFinder.js](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/lib/priceFinder.js) contains a `findPrice` function which uses Puppeteer and Cheerio to scrape the Amazon product page for the price.

The logic in the lambda goes as follows:

1. Retrieve the product information from the database
2. If the status is anything but "CONFIGURED", exit the function early. The product failed at some point because we were unable to find the price so it is unlikely that we will be able to find the price now.
3. Call the [findPrice function](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/lib/priceFinder.js#L5) which does the following
   - Open a headless browser
   - Navigate to the product's URL
   - Load the page content into Cheerio
   - Use Cheerio to query the DOM using CSS selectors and find the price
   - Sometimes Amazon displays a message like "Add the product to your cart to see product details" instead of the price. If we can't find the price where it is supposed to be. Find and click the "Add to cart" button.
   - Wait for the next page to load
   - Load next page into Cheerio
   - Use Cheerio to query the DOM to find the price
   - If we could not find the price after these methods, return an error message
   - The price usually has a dollar sign in front of it. Use a regex to parse out the decimal price.
   - Convert the price to a number and return the result
4. Get the latest price point from the database
5. Create a new PricePoint record in the database
6. Call the [sendEmails](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/amplify/backend/function/priceWatcher/src/lib/emailHelper.js#L146) function to send email notifications to all subscriptions
   - Get a list of product subscriptions from the database and filter by `status === "CONFIGURED"`
   - Figure out which email subscriptions have had a notification in the past
   - Split the subscriptions into those that should receive an initial price notification and those that should receive a price drop notification
   - Send the email notifications using SendGrid
7. Return a success message - its not important what is returned by the function handler but it IS important that it returns something for the message to be deleted from the queue. Otherwise, the message will stay on the queue and continue to trigger the lambda.

### Frontend

The frontend code can be found in the [root directory's src folder](https://github.com/tylercurtispohl/amazon-price-watcher/tree/773d9926b3ad238fe0547df7693886c7be4d60fa/src). This folder contains the generated code from Amplify for interacting with the database, a middleware.ts file containing code for Clerk authentication, and [the Next.js application in the app folder](https://github.com/tylercurtispohl/amazon-price-watcher/tree/773d9926b3ad238fe0547df7693886c7be4d60fa/src/app).

Next.js provides file-based routing (cool, right?). Any folder with a `page.tsx` file that exports a default component, will be turned into a route. You will see a `page.tsx` file in create-product, create-subscription/[productId], product/[id], and subscription/[subscriptionId]. The folder structure with `page-name/[some_value]` gives us dynamic routes. The folder name defines a parameter that can be extracted from the URL. For example, navigating to `product/123` will give the product page a parameter called `id` with the value `"123"`. 

Quite a few aspects of the frontend code were separated from the `page.tsx` files into reusable React components found in [the src/app/components folder](https://github.com/tylercurtispohl/amazon-price-watcher/tree/773d9926b3ad238fe0547df7693886c7be4d60fa/src/app/components).

The [app/actions.ts file](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/src/app/actions.ts) contains what are called "server actions" in Next.js. These are functions which can be called from client-side code that run on the server, similar to an API. These make it easy to do CRUD operations based on form submissions in the application. You can see an example of how these are called in [src/app/create-product/page.tsx](https://github.com/tylercurtispohl/amazon-price-watcher/blob/773d9926b3ad238fe0547df7693886c7be4d60fa/src/app/create-product/page.tsx).

## Testing the application

You can test an initial price notification easily by creating a new subscription. Within 5 minutes, you should receive an email containing the product name, URL, and price.

However, testing the new price notification is a little tricky to test as there aren't price drops in products very often. To test this, I manually updated PricePoint records in the DynamoDB console. I will find the latest PricePoint for a Product and manually edit it to have a higher price. This way, the next time we check for the price, the application will send a new price notification.

## Challenges during development
1. The convenient Amplify CLI does not cover everything. It does not have built in functionality to create a queue, for example, so this must be created manually. Once a custom resource like this is created manually, Amplify is able to create the resource in AWS using CloudFormation. While I had done this in the past, I couldn't remember how off the top of my head and have no access to that repository. But [this guide](https://awstip.com/implementing-sqs-queue-with-lambda-in-aws-amplify-using-cloudformation-d7bd8a0ae3d4) helped me figure it out again.
2. As mentioned earlier, useing Amplify can push you out of the free tier if you make a lot of Amplify Push or Pull commands. This is because those operations make many requests to Amazon S3 and you only get 2000 requests in 12 months for the free tier. During development, you make a lot of push and pull requests, so you might bump yourself out of the free tier pretty quickly. I had to create a whole new AWS account and environment to not spend any money on this assignment. (Although, I probably would have only been charged a few pennies.)
3. Puppeteer does not work out of the box in lambda functions. I think it needs a version of chromium on the machine it's running on. You can get around this by installing the package @sparticuz/chromium. BUT you must configure a lambda layer and install it to the layer rather than installing it directly in the lambda. This is because there is a size limit on code pushed to lambda functions of about 50 mb. The chromium package might push you over this limit. So we install it into a layer and include the package from there. [This guide](https://medium.com/@anuragchitti1103/how-to-run-puppeteer-on-aws-lambda-using-layers-763aea8bed8) helped me figure out why puppeteer wasn't working in the Lambda function and how to resolve it.

## Possible future extensions to the project

There are quite a few features I would add and things I would want to change if this were a longer term, production-ready project. In no particular order, some of these things are:

1. Convert lambda functions to TypeScript. I spent some time trying to figure this out but it wasn't working quite right and I couldn't spend any more time on it. But I know it works so given a little more time, we could set this up to utilize TypeScript.
2. Share Amplify API generated code between the frontend and backend. I tried to do this along with converting the lambda functions to TypeScript but again, it wasn't working quite right and I couldn't spend any more time on it.
3. The SendGrid API key should be stored in a Secret in Secrets Manager. Right now it is in an environment variable on the priceWatcher function that gets wiped out every time you deploy new code. This is clearly not ideal but you also can't put the API key in the public code repository. Given just a little more time, I would be able to implement this fairly easily.
4. Add more subscription methods. In the future, this could be extended to also send text messages. This would simply involve adding a Type field to the ProductSubscription table and some more helper functions to send the text messages through a service like Twilio.
5. Separate notification sending to a separate lambda so that each lambda only has one responsibility. This way the priceWatcher lambda would ONLY find the price and then put a message on another queue that would be picked up by a sendNotifications lambda.
6. Handle SendGrid errors better. We should be doing something with the response from SendGrid and flagging bad emails appropriately. Currently, we just log any error messages that come back from SendGrid.
7. Make nicer email templates.
8. Better handle db CRUD errors. Currently, if the create product or create subscription functionality fails for some reason, its going to fail silently.
9. Consider checking for the price less often. I did every 5 minutes for this so that I never had to wait long and could get more test data. In production, it's probably not necessary to check this often unless there is a requirement to know about a price change within minutes. To save money on lambda executions, logging, and queue message requests, we could consider checking every 20-30 minutes instead.
10. Optimize UI for small/mobile screens. This will currently only look good on tablet or larger size screens.
11. Implement delete functionality for all tables. I left this out for now because you want to make sure to delete all related data when deleting a record to not leave orphaned records in the database and I wasn't prepared to go down that road for this project.
12. Allow editing of products and subscriptions. Currently, a user can only disable them and create new ones.
13. Add unit testing.
14. Create a deadletter queue for errored messages to go into.

## Setting up a dev environment

The app is already hosted on Amplify [here](https://main.d2vxw4o9kxswbk.amplifyapp.com/) so it isn't necessary for you to run and test the application in your own environment. Setting up a dev environment is quite involved. BUT if you really want to, here is how it can be done.

1. [Follow this guide](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html) to create a new AWS Account unless you already have one you want to use.
2. If you want to be alerted when you are about to spend any money on your AWS account, [follow this guide](https://www.linkedin.com/pulse/setting-up-cost-budget-your-aws-account-mark-smoktunowicz/) to create a zero-spend budget.
3. Creating an account will give you a root user. But you should not interact with your account much as the root user. Instead, you should create an administrator IAM user for yourself. If you don't already have one [follow this guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console) to create one.
   - In step 5
     - Under “Are you providing console access to a person?”, select “I want to create an IAM user”
     - Under “Console password”, select “custom password” and provide a password for your user and take note of it somewhere
     - Deselect “Users must create a new password at next sign-in - Recommended” if you don’t want to have to create
   - In step 6, select “Attach policies directly” and give it “AdministratorAccess”
   - After creating the user, you’ll be on the “Retrieve password” page, take note of the sign-in URL and password if you didn’t before
4. Sign out of the root user and sign in as the new admin user with the sign-in url you wrote down
5. Now we can set up amplify and deploy the application
6. Follow [these instructions](https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/#configure-the-amplify-cli) to configure the Amplify CLI
   - Make sure you’re installing the CLI globally with the -g flag in npm install
   - When setting permissions for the IAM user, give the user the “AdministratorAccess-Amplify” AND “AmazonSQSFullAccess” permissions policies. This is important for later as we need to create queues and AdministratorAccess-Amplify does not include the permissions to create a queue.
   - When asked to give the profile a name, you should give it a name other than default if you use the AWS or Amplify CLIs for other things. Take note of the name you give the profile.
7. Clone this repository or download the code
8. Create a new repository in github - you’ll need to set up automated deployments from it later to host the app
   - Once the empty repository is created, it will give you a command `git remote add origin <URL_TO_YOUR_REPO_ORIGIN>` - copy this
9. In the root of the repository run the command `git remote remove origin`
10. Paste in and run the command you copied in step 8 `git remote add origin <URL_TO_YOUR_REPO_ORIGIN>`
11. Run the command `git push -u origin main`
12. Delete the file at `amplify/team-provider-info.json` if it exists - this should have been gitignored
13. Run the command `amplify init` and follow the steps it provides
    - Enter a name for the environment - select the default dev or provide another name
    - Choose your default editor - Visual Studio Code
    - Select the authentication method you want to use - select Aws Profile and then select the profile you created earlier
14. Run the command `amplify push`
    - When asked “Are you sure you want to continue” just press enter
    - If asked to “Accept the suggested layer version configuration” select Y or press enter
    - When asked “Do you want to update code for your updated GraphQL API” select Yes or Y
    - When asked “Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types? his will overwrite your current graphql queries, mutations and subscriptions” select Yes or Y
    - This will take a few minutes
    - You may see this error `ENOTEMPTY: directory not empty, rmdir '/Users/tyler/repos/ecfx-test-2/amazon-price-watcher/amplify/#current-cloud-backend/function/orchestrator/src/node_modules'` but it seems to be okay. According to [this](https://github.com/aws-amplify/amplify-category-api/issues/1198) it might just be because I had VS Code open
15. Set up CI/CD for the app hosting
    - In the AWS console, go to AWS Amplify
    - Select the app called “amzpricewatcher”
    - Follow the steps to connect a github repo - you may redirected to github to give permission to the repo - I won’t go through all the steps because it may be slightly different, depending on your AWS and github (or other services) settings
16. Follow [this guide](https://www.twilio.com/en-us/blog/build-a-contact-form-with-amplify-that-emails-using-aws-lambda-and-sendgrid) to create a sendgrid account and get an API key
    - Skip the steps to create the lambda and dynamodb table since we already have the lambda created
    - However, you MUST manually create an environment variable containing the sendgrid API key
      - In the console, navigate to Lambda
      - Go to the priceWatcher-<env> lambda
      - Go to the Configuration tab and click “Environment Variables” on the left
      - Click “Edit”
      - Click “Add environment variable”
      - Call the new variable “SENDGRID_API_KEY” and paste in the API key you received in the Sendgrid tutorial
      - Click “Save”
      - *_This variable will get wiped out on every deploy - I need to figure out how to persist it or better yet, store it in an AWS secret key_*
17. Update `amplifyconfiguration.json` - I am not sure how this gets updated - probably when you call amplify add api which we didn’t do here
    - Find the file at src/amplifyconfiguration.json
    - Paste this JSON into it `{ "aws_project_region": "us-west-1", "aws_appsync_graphqlEndpoint": "", "aws_appsync_region": "us-west-1", "aws_appsync_authenticationType": "API_KEY", "aws_appsync_apiKey": ""}`
    - In the AWS console, go to lambda
    - Go to the orchestrator-<ENV> lambda
    - Go to the Configuration tab
    - Click Environment Variables on the left
    - Copy the value of `API_AMZPRICEWATCHER_GRAPHQLAPIENDPOINTOUTPUT` and paste it into `aws_appsync_graphqlEndpoint` in the `amplifyconfiguration.json` file
    - Copy the value of `API_AMZPRICEWATCHER_GRAPHQLAPIKEYOUTPUT` and paste it into `aws_appsync_apiKey` in the `amplifyconfiguration.json` file
19. Set up authentication with Clerk.com
    - Go to clerk.com and create a free account
    - It will have you create an app
    - It will give you environment variables to put into an .env.local file
    - Create a .env.local file at the root directory and paste those values in
    - Add the values to Amplify environment variables
      - Go to Amplify in the console
      - Go to the amzpricewatcher app
      - Go to “Environment Variables” on the left
      - Add the 2 clerk environment variables from your .env.local file
    - These won’t be accessible to nextjs by default so you have to enable them. In the Amplify app console, go to Build Settings on the left
    - In the “App build specification” click edit
    - Add these two lines below frontend -> phases -> build -> commands right before - npm run build
        - `env | grep -e CLERK_SECRET_KEY >> .env.production`
        - `env | grep -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY >> .env.production`
        - The whole file will look like this
     
 ```
version: 1
backend:
  phases:
    build:
      commands:
        - '# Execute Amplify CLI with the helper script'
        - amplifyPush --simple
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - env | grep -e CLERK_SECRET_KEY >> .env.production
        - env | grep -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - .next/cache/**/*
      - node_modules/**/*

 ```

Now you should be able to run the application locally by running the command `npm install && npm run dev` in the root of the repository. Or you can find the hosted URL in the Amplify Console.

1. In the AWS Console, go to AWS Amplify
2. Under "All apps" go to the app called `amzpricewatcher`
3. Under the "Hosting environments" tab, you'll see the environment called "main".
4. There is a link here to the hosted application as shown in the screenshot below

![link_to_hosted_app](https://github.com/tylercurtispohl/amazon-price-watcher/assets/48455432/677a32e2-fd59-4696-8083-b2dbaa0f1fa3)

Now you can run and modify the application as you like! Enjoy!


