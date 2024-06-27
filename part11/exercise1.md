# 11.1 Warming up
Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

The points to discuss:

Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.
What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!
Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
Remember that there are no 'right' answers to the above!

### Answers
Software engineers would develop their features on different branches. For example, an engineer developing a chat feature would do so on the "chat feature" branch.

When the feature is complete, they lint their code, such as with eslint, run test cases such as end to end testing with Playwright or integrated testing with Vitest. They then commit and push changes to their own branches before merging their branch with the production branch via a pull request. 

The lead engineer would review the request before merging the branches, hence integrating that new feature. The resulting codebase is then built and then deployed on the server.

An alternative to Jenkins is CodePipeline by AWS.

In this scenario, usually it is better to use a cloud solution as the team is still relatively small and the app has yet to be released. When the app grows and new team members are added, the team can consider investing in their own server for more configuration options. However, the current situation does not call that much for an immediate server purchase.