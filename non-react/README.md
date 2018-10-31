# README / Project Roadmap

This site is a digital version of the Johnson O'Connor Research Foundation's Wordbooks, a series of vocabulary building exercise books. The goal is that by providing the material digitally, clients will be more likely to use these resources.

Content will be replicated from the printed books. Some functionality, like auto-grading of quizzes, will be added.

### Roadmap

#### App journey
1. Placement quiz
  1. See 1 (of 8) quizzes at a time
  2. After completing quiz 1, if you get <2 wrong, you advance to quiz 2; else, you place into Wordbook 1
    - continue advancing to next quiz as long as you get <2 wrong; once you get 2++ incorrect, you place into that level of Wordbook
  3. After placing into a Wordbook you are given the option to purchase
    - maybe see a page with an explanation of how the Wordbook is structured?
    - create an account as part of this step

2. Wordbook
  1. TOC
  2. Pronunciation key (same content for each Wb!)
  3. How to use this book (same content for each Wb!)

#### Questions
1. Should Wordbook auto-score as you go along, or wait until submit is clicked?
  > Instinct: wait until submit is clicked

2. Should you see one definition at a time, or see all at once?
  > Instinct: show each definition immediately following the word, after 'submit' is clicked

3. Hide definitions for exercises?
  > Instinct: yes. Although then answers will need to be saved, probably.


#### Web hosting
[ ] Explore options for hosting site
  - Heroku
  - Cloudflare

[ ] Explore options for payment
  - Stripe
  - Pay through JOCRF office, receive a code to log in


#### Issues / Things I Do Not Know
- database
- account creation
- handling of sensitive information / credit card data
- we'll need a privacy policy, probably
