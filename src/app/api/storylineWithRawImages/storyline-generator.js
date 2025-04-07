import { config } from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

// In last there is a usage example, which you can refer to generate content for any category and product by importing the AIContentGenerator class.
// Also make sure to set the NEXT_PUBLIC_ANTHROPIC_API_KEY in the environment variables in .env file.
// Use this command to run the file: node src/app/storyline-generator/ai_content_generator.mjs, in root directory

// StoryTemplate class
class StoryTemplate {
    constructor(hook, filler1, filler2, filler3, bait, cta) {
        this.hook = hook;
        this.filler1 = filler1;
        this.filler2 = filler2;
        this.filler3 = filler3;
        this.bait = bait;
        this.cta = cta;
    }
}

// TemplateManager class
class TemplateManager {
    constructor() {
        this.templates = {
            "Skincare Transformation":  [
                new StoryTemplate(
                    "Why I stopped using my $300 routine",
                    "Spent $3,647 last year on [expensive solutions: serums, treatments, products]. Nothing worked. I kept struggling with [problem: breakouts, hair loss, fatigue] no matter what I tried.",
                    "Finally discovered the real issue: [unexpected cause: water quality, diet, environment]. It was shocking—[fact about the issue: high chlorine, hidden toxins, poor absorption].",
                    "Tried this [game-changing product] that everyone’s been talking about, and my [affected area: skin, hair, energy] completely changed in [short timeframe].",
                    "Plot twist: It was a [$price product] that made the difference, not the expensive [original solution: skincare, treatments, prescriptions].",
                    "Comment '[keyword]' for my complete [topic: skincare, wellness, recovery] routine and product link."
                ),
                new StoryTemplate(
                    "I solved [problem] without [typical solution]",
                    "Struggled with [problem] for [X years]. Tried every [medication/treatment/product], but nothing worked.",
                    "Turns out the real issue was [unexpected factor: hidden chemicals, lack of nutrients, environmental toxins].",
                    "This [simple/product name] changed everything in just [timeframe].",
                    "The [game-changing product] did what [expensive/complex solution] couldn’t—naturally solved my [problem].",
                    "Drop a '[emoji/keyword]' for my complete [topic] routine!"
                ),
                new StoryTemplate(
                    "[Experts] don’t want you to know this trick",
                    "Spent [$X] on [professional service: consultations, prescriptions, treatments] only to be told to buy more expensive [products/medications].",
                    "Discovered that most [problem] actually starts with [unexpected cause: , poor air quality, diet imbalance].",
                    "This [$price product] fixed what [$X worth of solutions] couldn't.",
                    "The [product name] costs less than one [expert service] visit but works even better!",
                    "Type '[keyword]' for my full journey and proof."
                )
            ],
            "Hair Care": [
                new StoryTemplate(
                    "Why your expensive [PRODUCT_TYPE] isn't working",
                    "Spent [$PRICE] on premium [PRODUCT_TYPE] but my [PROBLEM_AREA] still felt [NEGATIVE_EFFECT]",
                    "[ISSUE_CAUSE] prevents [PRODUCT_BENEFIT] from working effectively",
                    "This [SOLUTION_PRODUCT] solved the issue - my [PROBLEM_AREA] transformed in just [TIME_FRAME]",
                    "The [SOLUTION_PRODUCT] saves you money on [PRODUCT_TYPE] that weren't working anyway",
                    "Type \"[CTA_KEYWORD]\" for my complete [CATEGORY] routine"
                ),
                new StoryTemplate(
                    "The REAL reason your [GOAL] isn't happening",
                    "Tried [ALTERNATIVE_SOLUTIONS] for months. Nothing worked",
                    "[EXPERT] revealed: [ROOT_CAUSE] is the real problem",
                    "Started using this [SOLUTION_PRODUCT] - my [GOAL] improved in just [TIME_FRAME]",
                    "The [SOLUTION_PRODUCT] removes [OBSTACLE] and helps you achieve [GOAL]",
                    "Comment \"[CTA_KEYWORD]\" for my full [CATEGORY] transformation journey"
                )
            ],
            "Water Quality": [
                new StoryTemplate(
                    "The shocking truth about [COMMON PROBLEM]",
                    "Did you know that [UNEXPECTED FACT ABOUT THE PROBLEM]? Most people deal with this every day without realizing it.",
                    "Studies show that [SCARY STATISTIC OR CONSEQUENCE] can have serious long-term effects.",
                    "I found a simple solution – [PRODUCT] – and the difference was night and day!",
                    "[PRODUCT] works by [HOW IT SOLVES THE PROBLEM] and literally pays for itself in just [TIME FRAME].",
                    "Comment \"[CALL TO ACTION KEYWORD]\" if you want the link and my before/after results!"
                ),
                new StoryTemplate(
                    "I tested [THING RELATED TO PROBLEM] and was shocked",
                    "I used [TESTING METHOD] to check if [PROBLEM] was really affecting me. The results were worse than I expected.",
                    "[SCIENTIFIC OR EXPERT BACKUP] proves that [PROBLEM] leads to [NEGATIVE OUTCOME], which is why so many people struggle with it.",
                    "I tried [PRODUCT] to see if it could make a difference – and it completely changed my experience.",
                    "[PRODUCT] is designed to [MAIN BENEFIT], making it a must-have for anyone dealing with [PROBLEM].",
                    "Type \"[CALL TO ACTION KEYWORD]\" if you want to see my test results and get the link!"
                ),
                new StoryTemplate(
                    "The hidden danger of [COMMON ISSUE]",
                    "Most people don’t realize that [COMMON ISSUE] is secretly causing [NEGATIVE EFFECT].",
                    "This leads to [LONG-TERM CONSEQUENCE], which can make things even worse over time.",
                    "After struggling with this myself, I finally found [PRODUCT] – and it was a game-changer.",
                    "[PRODUCT] helps by [HOW IT SOLVES THE ISSUE] without needing [EXPENSIVE OR DIFFICULT ALTERNATIVE].",
                    "Comment \"[CALL TO ACTION KEYWORD]\" if you want to know more!"
                )
            ],
            "Luxury Beauty": [
                new StoryTemplate(
                    "Why celebrities always have the best {benefit}",
                    "Talked to an insider who works with top celebrities. Their #1 secret isn't expensive {traditional_solution}",
                    "They actually rely on {premium_solution} that costs thousands",
                    "Found the same technology in a {affordable_solution} that's going viral",
                    "The {product_name} gives you that celebrity-grade {benefit} without the luxury price tag",
                    "Comment \"{keyword}\" for my full {topic} secrets"
                ),
                new StoryTemplate(
                    "Why {premium_experience} feels different",
                    "Ever notice how your {aspect} feels amazing after {luxury_scenario}?",
                    "{High_end_alternative} use {exclusive_technology} that costs thousands",
                    "This {product_type} brings that same {premium_benefit} to your home",
                    "The {product_name} gives you {luxury_experience} for less than {cost_comparison}",
                    "Type \"{keyword}\" for my {premium_experience} secrets"
                )
            ],
            "Asian Beauty": [
                new StoryTemplate(
                    "The secret behind [desirable outcome] that [group of people] swear by",
                    "It's not just about [common misconception]. [Group of people] have something most others don’t",
                    "In [region/country], [unique feature or practice] is a game-changer for [problem it solves]",
                    "Found the exact same [technology/feature] in this [product category] that's all over [social media platform]",
                    "The [product name] brings you that same [premium/elite] experience at home",
                    "Comment \"[ENGAGE_WORD]\" for the link and my full experience"
                ),
                new StoryTemplate(
                    "The [simple hack] that went viral in [region/community]",
                    "Ever wonder why [desired outcome] is so much easier in [region]? It's not just about [common misconception]",
                    "In [region], [unique feature or practice] is the secret behind [benefit]",
                    "This [product category] brings that same [advantage] to your [home/lifestyle]",
                    "The [product name] transforms your [experience] into a [premium/elite/desired experience]",
                    "Comment \"[ENGAGE_WORD]\" for my full [transformation/review] story"
                )
            ],
            "Water Education": [
                new StoryTemplate(
                    "The mistake you're making daily with [PRODUCT]",
                    "You wouldn’t settle for low-quality [RELATED ITEM], but you’re using [PRODUCT] without realizing its impact",
                    "[SHOCKING FACT] about [PRODUCT] that most people don’t know",
                    "This [PRODUCT TYPE] fixes [COMMON PROBLEM] before it affects you",
                    "[PRODUCT] is like a [WELL-KNOWN ANALOGY] for [BENEFIT]—and it actually works",
                    "Comment \"[TRIGGER WORD]\" for my [OUTCOME/RESULT]"
                ),
                new StoryTemplate(
                    "I tested every viral [PRODUCT CATEGORY]... except one",
                    "Spent $[BUDGET] testing [NUMBER] different [PRODUCT CATEGORY] from [SOURCE]. Most were disappointing",
                    "Almost gave up until [UNEXPECTED PERSON/SOURCE] recommended the one I hadn’t tried",
                    "First experience with this [PRODUCT] and I literally saw the difference in [BENEFIT]",
                    "[PRODUCT] outperformed everything else—and it’s not even the most expensive",
                    "Type \"[TRIGGER WORD]\" for my complete [PRODUCT CATEGORY] comparison results"
                )
            ],
            "Spa Experience": [
                new StoryTemplate(
                    "The $50 [product category] hack",
                    "High-end [industry/niche] use specialized [feature/technology] for [benefit]",
                    "Discovered you can get the same [benefit] at home for a fraction of the cost",
                    "This [product] transforms your [usage environment] into a premium experience",
                    "The [product name] gives you [premium feature/benefit] every single day",
                    "Comment \"[keyword]\" for my full experience guide"
                )
            ],
            "Japan Travel": [
                new StoryTemplate(
                    "The hidden problem affecting your daily routine",
                    "For years, I couldn't figure out why my [skin/hair/health] felt different",
                    "Did some research and found shocking levels of [harmful substance/problem] in my [environment/water/air/product]",
                    "This simple [solution/product] completely changed my [routine/life/health]",
                    "The [product name] made my [affected area] feel better than ever, even with [existing problem]",
                    "Comment \"INFO\" for the full details on how I fixed it"
                )
            ],
            "Korean Beauty": [
                new StoryTemplate(
                    "The real reason [desired outcome] looks so good",
                    "It's not just [common misconception]. [People in a certain place] have something most [your audience] don’t.",
                    "Every [relevant location or situation] has [feature/technology] that makes a huge difference.",
                    "Found the exact same [feature/technology] in this [product category] that's all over [popular platform].",
                    "The [product name] gives you [desired benefit] right at home.",
                    "Comment \"[trending keyword]\" for the link and my [related routine/experience]."
                )
            ],
            "French Lifestyle": [
                new StoryTemplate(
                    "Why [Group of People] Have Better [Desirable Attribute]",
                    "Spent time in [Location] – my [Attribute] completely transformed within weeks!",
                    "[Reason why Location has a better standard related to the Attribute] compared to [Another Location]",
                    "Found this [Product/Tool] that replicates [Location]'s benefits",
                    "The [Product Name] brings that [Location] quality to your [User's Environment]",
                    "Comment \"[Keyword]\" for my [Location]-inspired [Benefit] secrets!"
                )
            ],
            "Water Quality Education":[
                new StoryTemplate(
                    "The mistake you're making daily with [product_category]",
                    "You wouldn't use [related_product] without [essential_feature], but you're missing it in your [product_category] every day",
                    "Using [product_category] without [essential_feature] can cause [negative_impact]",
                    "This [product_name] solves that by [how_it_helps]",
                    "[Product_name] is like a [trusted_comparison] but for [what_it_improves]",
                    "Comment \"[keyword]\" to see my transformation with [product_category]"
                ),
                new StoryTemplate(
                    "The truth about [common_problem] and its impact on you",
                    "[Common_problem] is affecting you more than you realize – it leads to [negative_impact]",
                    "This can cause [list of negative effects], making life harder than it needs to be",
                    "Found this game-changing [product_category] that [how_it_helps]",
                    "[Product_name] fixes [common_problem] without [expensive/inefficient_alternative]",
                    "Comment \"[keyword]\" if you want to try it for yourself"
                ),
                new StoryTemplate(
                    "I tested [product_category] and was shocked",
                    "I tried [testing_method] on my [product_category], and the results were shocking – [unexpected_findings]",
                    "[Negative_impact] from [common_problem] is real, and it's affecting [affected_area]",
                    "Switched to [product_name] and [measurable_improvement] happened instantly",
                    "[Product_name] pays for itself by saving you from [costly_alternative]",
                    "Comment \"[keyword]\" if you want to see my full results"
                )
            ],
            "Hair Care Solutions": [
                new StoryTemplate(
                    "Why your expensive [PRODUCT_CATEGORY] isn't working",
                    "Spent $[PRICE] on premium [PRODUCT_TYPE] but still faced [PAIN_POINT]",
                    "[HIDDEN_ISSUE] prevents [EXPECTED_RESULT] from happening",
                    "Tried [SOLUTION] – the difference was night and day!",
                    "[PRODUCT_NAME] helps you stop wasting money on things that don't work",
                    "Type \"[CALL_TO_ACTION]\" for my full experience!"
                ),
                new StoryTemplate(
                    "The REAL reason your [DESIRED_OUTCOME] isn't happening",
                    "Tried [COMMON_SOLUTIONS] for months. Nothing worked",
                    "[EXPERT] revealed: [ROOT_CAUSE] is the real issue",
                    "Started using [SOLUTION] – saw [RESULT] in just [TIME_FRAME]",
                    "[PRODUCT_NAME] helps solve [ROOT_CAUSE] so you finally achieve [DESIRED_OUTCOME]",
                    "Comment \"[CALL_TO_ACTION]\" for my full [TRANSFORMATION] journey"
                )
            ],
            "Luxury Spa Experience": [
                new StoryTemplate(
                    "The $50 life hack you need",
                    "Ever wonder how professionals get better results effortlessly?",
                    "Turns out, they rely on a simple tool that makes all the difference",
                    "This product brings that same pro-level experience into your daily life",
                    "[PRODUCT_NAME] helps you achieve premium results without breaking the bank",
                    "Comment \"HACK\" for my go-to secrets"
                ),
                new StoryTemplate(
                    "Why high-end experiences feel different",
                    "Ever notice how [CATEGORY] at luxury places just feels better?",
                    "That’s because they invest in top-tier solutions that most people overlook",
                    "This product brings that same premium experience to your home/life",
                    "[PRODUCT_NAME] gives you [BENEFIT] at a fraction of the cost",
                    "Type \"VIP\" to unlock the secret"
                ),
                new StoryTemplate(
                    "The secret behind [CELEBRITY/EXPERT] results",
                    "Had a chat with an industry insider—they revealed a surprising trick",
                    "Turns out, the key to their success isn’t what you think",
                    "I found the same [TECHNOLOGY/INGREDIENT] in an affordable [PRODUCT_TYPE]",
                    "[PRODUCT_NAME] lets you experience [BENEFIT] without the premium price tag",
                    "Comment \"INSIDER\" for the full breakdown"
                )
            ],
            "Product Comparison": [
                new StoryTemplate(
                    "I tested every viral [product category]... except one",
                    "Spent $[amount] testing [number] different [product category] from [source]. Most were disappointing",
                    "Almost gave up until [trusted source/person] recommended the one [product] I hadn't tried",
                    "First time using [product] and I literally saw the difference in [key benefit]",
                    "[Product] outperformed everything else - and it's not even the most expensive",
                    "Type \"[KEYWORD]\" for my complete [comparison/results]"
                ),
                new StoryTemplate(
                    "I replaced all my [existing solution] with THIS",
                    "Used to have a [complex routine] with [number]-step process. Still had [problem]",
                    "Learned that [underlying issue] was undoing all my expensive [existing solutions]",
                    "Switched to this [type of product] and simplified to just [minimal solution]",
                    "[Timeframe] with [product] and my [problem] is better than ever",
                    "Comment \"[KEYWORD]\" to see what [related items] I actually kept"
                ),
                new StoryTemplate(
                    "The $[price] secret to [desired result]",
                    "Tried every viral [related product]. Spent over $[amount] last year chasing that [goal]",
                    "My [trusted source] told me I was focusing on the wrong thing - it's about [key insight]",
                    "This [product] changed everything. My [aspect of life] literally [improved result]",
                    "[Product] costs less than one [expensive alternative] but works better than all of them",
                    "Type \"[KEYWORD]\" for my complete before/after journey"
                )
            ],
            "Tribe": [
                new StoryTemplate(
                    "I lost everything to burnout at 25, found this tribe that hasn't been sick in 50 years... These morning habits changed my life completely",
                    "The first thing they taught me was this powerful breathing practice they do at sunrise",
                    "Every home has a dedicated space for morning rituals to align their energy",
                    "A visiting traveler introduced them to {product_name} years ago – now it's the only modern item they refuse to give up",
                    "I learned that it's called {product_name}, and you can just get it on Amazon or their website. I just bought one for myself and my entire family",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Quit my $200k job after a panic attack & moved to a tribe that never gets stressed... These are their daily habits that reversed my aging in weeks",
                    "Instead of supplements, they eat these nutrient-packed superfoods that keep them energized all day",
                    "My back pain disappeared after sleeping their way – directly on the floor with just a thin mat",
                    "Their only modern indulgence? {product_name} – they swear it’s their secret to staying youthful",
                    "I found out you can get it on Amazon or their website. It's called {product_name}, and it’s life-changing",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Doctors said my health condition would end my life by 30… so I spent my savings to live with a tribe where people live to 100 and never get sick",
                    "These rare mountain berries are only harvested during full moons for maximum potency",
                    "Every morning before sunrise, the entire village performs these ancient exercises in the cold air",
                    "When I asked about modern items, they showed me {product_name}, which they say is the secret to their well-being",
                    "I found out that you can just get it online, and it’s called {product_name}. It’s a game-changer!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Had a panic attack during a meeting, packed a bag, and went to live with the world's healthiest tribe",
                    "No one uses phones or watches – they tell time by the position of shadows",
                    "I'm being driven by the village leader in their only vehicle – they believe fewer cars keep their air sacred",
                    "The village shares ONE modern luxury – {product_name}. They say it transformed their lives",
                    "I learned it’s called {product_name}, and you can get it on Amazon or their website. Just ordered one for my whole family!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "My phone addiction nearly killed me… so I went to live with people who only use ONE piece of technology",
                    "Instead of checking phones, they read nature’s clock using shadow positions",
                    "There’s only one car in the entire village, and they only use it for emergencies – they say engines disturb nature’s energy",
                    "When I asked about modern items, they showed me {product_name}, which they consider essential",
                    "I found out you can get it online, and it’s called {product_name}. I had to try it myself!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "I was taking 15 medications at 30. I thought, ‘this can’t be it,’ so I found a tribe that hasn’t seen a doctor in 50 years and spent a month there. Here’s what I learned",
                    "Their day starts at 5 AM with special breathing rituals that ‘program’ their body for the day",
                    "Before bed, they activate these special stones that supposedly cleanse negative energy",
                    "Their only connection to the modern world is {product_name}, which they claim is their health secret",
                    "I learned that it's called {product_name}, and you can get it on Amazon or their website. Just bought one for myself and my family!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Stress made my hair fall out at 25, so I went to a remote village with no hospitals and discovered the weirdest health routines",
                    "The mountain tribes preserve these unique herbs that they believe have powerful healing properties",
                    "These rare superfoods are only picked during the full moon for maximum potency",
                    "The village has ONE modern tool – {product_name}, which they believe keeps them healthy and thriving",
                    "I found out you can get it online, and it’s called {product_name}. It’s been a game-changer!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Modern medicine failed me, so I went to live with the world’s healthiest tribe… here are the 3 things that fixed me",
                    "Instead of coffee, they practice traditional breathing techniques at dawn",
                    "The mountain tribes preserve these ancient ingredients that they say have powerful healing properties",
                    "The village doctor insists on {product_name} – says it’s their secret to lifelong health",
                    "I found out you can get it online, and it’s called {product_name}. I had to try it!",
                    "Comment \"tribe\" and I'll tag you in my next post"
                )
            ],
            "Mountain": [
                new StoryTemplate(
                    "I spent my last $5000 to learn from people who live past 100... These strange habits are their longevity secrets",
                    "They believe modern habits block natural healing, so they prioritize natural living",
                    "The village shares a single car - they believe too many vehicles disrupt the balance of nature",
                    "Despite rejecting modern life, every home has this {PRODUCT_CATEGORY} because it {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"longevity\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "My phone addiction landed me in the ER... so I lived with mountain people who only use ONE piece of technology. Their health secrets blew my mind",
                    "This is the village's only car - the mayor uses it to bring in essential supplies once a month",
                    "Instead of checking phones, they read nature's clock using shadow positions",
                    "Despite rejecting modern life, every home has this {PRODUCT_CATEGORY} because {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"disconnect\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "I had a mental breakdown at 28, and left my life behind to learn from a hidden mountain tribe. Here's what they do that fixed my health",
                    "The first thing they taught me was this powerful breathing practice they do at sunrise",
                    "No one uses phones or watches - they tell time by the positions of shadows",
                    "The village doctor insists on this {PRODUCT_CATEGORY} because it {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"healing\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "I quit my tech job to live with a mountain tribe for a month... their morning routine dropped my biological age by 15 years",
                    "Their morning starts at 5 AM with special breathing rituals that 'program' their body for the day",
                    "They sleep on the ground to 'connect with earth energy' and wake up with zero back pain",
                    "Despite rejecting modern technology, every home has this {PRODUCT_CATEGORY} because {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"reset\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Doctors gave me 6 months to live... so I moved to a remote village where people live to 120. Here's what I learned",
                    "The first thing they taught me was this powerful breathing practice they do at sunrise",
                    "They believe modern habits block natural healing, so everyone follows ancient wellness practices",
                    "The village shares ONE modern luxury - this {PRODUCT_CATEGORY} that {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"health\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Burned out at 25, I sold everything to live in the mountains... found the weirdest health secrets that fixed my life in 30 days",
                    "Bugs were a delicacy and a huge source of protein - they were sold everywhere like these beetle kebabs",
                    "My back pain disappeared after sleeping their way - directly on the floor with just a thin mat",
                    "The village doctor insists on this {PRODUCT_CATEGORY} because it {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"energy\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Everyone called me crazy for moving to a village with no WiFi... but their weird morning habit cured my depression in 2 weeks",
                    "Instead of checking phones, they read nature's clock using shadow positions",
                    "The elders taught me about these sacred stones that purify energy while you sleep",
                    "Despite rejecting modern life, every home has this {PRODUCT_CATEGORY} because {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"peace\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Doctors said my autoimmune disease was incurable... so I moved to a village where people live to 120",
                    "Every morning before sunrise, the entire village does these ancient breathing exercises in the cold air",
                    "They only harvest these special berries under a full moon - apparently, it doubles their healing power",
                    "Their only connection to the modern world is this {PRODUCT_CATEGORY} because it {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"healing\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "Left my 6-figure job to live with mountain people... their morning rituals reversed my aging in 3 weeks",
                    "The first thing they taught me was this powerful breathing practice they do at sunrise",
                    "Instead of home offices, they build these sunrise meditation spots in every home",
                    "The village shares ONE modern luxury - this {PRODUCT_CATEGORY} that {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"youth\" and I'll tag you in my next post"
                ),
                new StoryTemplate(
                    "My insomnia nearly drove me insane, then I discovered what mountain tribes do before bed that has me sleeping like a baby",
                    "What look like ordinary stones are actually their secret to deep sleep - placed right under where they rest",
                    "Each house builds this wall of corn facing southwest - they say it protects from negative energy",
                    "When I asked about modern items, they showed me this {PRODUCT_CATEGORY} because {PRODUCT_BENEFIT_1} and {PRODUCT_BENEFIT_2}",
                    "I learned it's called the {PRODUCT_NAME}, and you can just get it on {PLATFORM}. I just bought one for myself and my entire family",
                    "Comment \"sleep\" and I'll tag you in my next post"
                )
            ]            
        };
    }

    getRandomTemplate(theme) {
        if (!this.templates[theme]) {
            throw new Error(`Theme '${theme}' not found in templates`);
        }
        const templates = this.templates[theme];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    addTemplate(theme, template) {
        if (!this.templates[theme]) {
            this.templates[theme] = [];
        }
        this.templates[theme].push(template);
    }

    getAllThemes() {
        return Object.keys(this.templates);
    }

    getTemplateCount(theme = null) {
        if (theme) {
            return this.templates[theme] ? this.templates[theme].length : 0;
        }
        return Object.values(this.templates).reduce((acc, arr) => acc + arr.length, 0);
    }

    getTemplatesByTheme(theme) {
        if (!this.templates[theme]) {
            throw new Error(`Theme '${theme}' not found in templates`);
        }
        return this.templates[theme];
    }

    getTemplatesByCategory(category, count = 3) {
        if (!this.templates[category]) {
            throw new Error(`Category '${category}' not found`);
        }
        const availableTemplates = this.templates[category];
        return availableTemplates.length <= count ? availableTemplates : this.getRandomSamples(availableTemplates, count);
    }

    getRandomSamples(array, count) {
        const shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }
}

// Load environment variables
config();

class AIContentGenerator {
    constructor() {
        const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
        if (!apiKey) {
            throw new Error("ANTHROPIC_API_KEY not found in environment variables");
        }
        
        this.client = new Anthropic({ apiKey });
        this.templateManager = new TemplateManager();
        this.PROMPT_TEMPLATE = `You are a highly creative and viral-content-focused AI. Your task is to generate a compelling, high-engagement story for the category: {category}. The story must follow the same **viral storytelling style** as the examples below while incorporating the following product details:  

Product Name: {product_name}  
Product Description: {product_description}  

Key requirements:  
1. The content must be specifically related to the {category} category.  
2. The story must lead to an unexpected discovery that shifts the reader’s perspective.  
3. The {product_name} must be positioned as the breakthrough solution in both filler3 and bait sections.  
4. The story should feel authentic, engaging, and highly relatable to the target audience interested in {category}.  
5. The solution should align naturally with the product benefits: {product_description}.  
6. The story must reflect the lifestyle, habits, and unique persona of the target audience most likely to be interested in this product.
7. The tone, setting, and examples should match cultural references, trends, and values that resonate with the ideal user of {product_name}.

Structure requirements:  
hook: A bold, attention-grabbing statement designed to stop the scroll.  
filler1: Sets up the problem, struggle, or context related to {category}.  
filler2: Introduces an unexpected discovery or realization.  
filler3: Must mention {product_name} as the solution, weaving it naturally into the story.  
bait: Reinforces {product_name} as the unexpected, life-changing solution.  
cta: Encourages the audience to comment or engage further.  

Below are **inspirational examples** of viral story structures:  

{examples}  

Take inspiration from these examples and craft a creative,brand-new, highly engaging story that:  
1. Matches the same compelling, viral storytelling style.  
2. Stays within the **{category}** theme.  
3. Naturally positions **{product_name}** as the breakthrough solution.  
4. Creates a gripping narrative arc that builds curiosity and leads to the solution.  
5. Seamlessly incorporates the **product’s benefits**: {product_description}.
6. Strictly personalize the story to the most likely audience for {product_name}. e.g. if {product_name} is a trimmer, the story character should be a man persona.

Important instructions:  
- Do not return any other text than the story template in the requested format.
- Strictly follow the format and storytelling style of the examples.  
- Strictly do not deviate from the required structure.  
- Even if the product seems **incompatible** with the category, follow the instructions exactly. 
- Adapt the tone, setting, and details to align with the most likely audience for {product_name}. 
- Do not include any emojis.  
- Generate only one example per response. `
;
    }

    _formatTemplateExample(template, exampleNum) {
        return `Example ${exampleNum}:
StoryTemplate(
    hook="${template.hook}",
    filler1="${template.filler1}",
    filler2="${template.filler2}",
    filler3="${template.filler3}",
    bait="${template.bait}",
    cta="${template.cta}"
)`;
    }

    _getCategoryExamples(category) {
        const templates = this.templateManager.getTemplatesByCategory(category, 3);
        return templates.map((template, index) => this._formatTemplateExample(template, index + 1)).join("\n\n");
    }

    async generateTemplate(category, productName, productDescription) {
        try {
            const examples = this._getCategoryExamples(category);
            let prompt = this.PROMPT_TEMPLATE.replace("{category}", category.replace(/_/g, ' ').toUpperCase())
                                            .replace("{product_name}", productName)
                                            .replace("{product_description}", productDescription)
                                            .replace("{examples}", examples);
            
            prompt += `\n\nIMPORTANT: The response MUST explicitly mention the '${productName}' in both the filler3 and bait sections.`;
            
            
            const message = await this.client.messages.create({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 8192,
                temperature: 1,
                messages: [{
                    role: "user",
                    content: prompt
                }]
            });
            
            const aiResponse = Array.isArray(message.content) ? message.content[0].text : message.content;
            
            const templateDict = this._parseAIResponse(aiResponse, productName);
            
            return new StoryTemplate(
                templateDict.hook,
                templateDict.filler1,
                templateDict.filler2,
                templateDict.filler3,
                templateDict.bait,
                templateDict.cta
            );
        } catch (error) {
            console.error(`Error generating AI content: ${error.message}`);
            return null;
        }
    }

    _parseAIResponse(response, productName) {
        try {
            
            const pattern = /(\w+)\s*=\s*"((?:\\"|[^"])*?)"|(\w+)\s*=\s*'((?:\\'|[^'])*?)'/g;
            let match;
            const template = {};
            
            while ((match = pattern.exec(response)) !== null) {
                const key = match[1] || match[3];
                const value = match[2] || match[4];
                template[key.trim()] = value.trim();
            }
            
            
            const requiredFields = ['hook', 'filler1', 'filler2', 'filler3', 'bait', 'cta'];
            const missingFields = requiredFields.filter(field => !template[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
            }
            
            return template;
        } catch (error) {
            console.error(`Error parsing AI response: ${error.message}`);
            console.error(`Response content: ${response}`);
            throw error;
        }
    }
}

export default AIContentGenerator;

// ... existing code ...

// export async function POST(request) {
//     // Parse the request body
//     const { category, productName, productDescription } = await request.json();

//     // Create an instance of AIContentGenerator
//     const generator = new AIContentGenerator();

//     // Generate the template
//     const template = await generator.generateTemplate(category, productName, productDescription);

//     // Return the generated template as a response
//     return new Response(JSON.stringify(template), {
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
    
//     // ... existing code ...
// }

// // Usage example
// async function generateSampleContent() {
//     try {
//         const generator = new AIContentGenerator();
        
//         const category = "Tribe";
//         const productName = "Afina";
//         const productDescription = "Advanced shower filter that removes chlorine, heavy metals, and harmful chemicals from your water, leading to healthier skin and hair";
        
//         const template = await generator.generateTemplate(
//             category,
//             productName,
//             productDescription
//         );
        
//         console.log("Generated Template:");
//         console.log("Hook:", template.hook);
//         console.log("Filler 1:", template.filler1);
//         console.log("Filler 2:", template.filler2);
//         console.log("Filler 3:", template.filler3);
//         console.log("Bait:", template.bait);
//         console.log("CTA:", template.cta);
//     } catch (error) {
//         console.error("Error generating content:", error.message);
//     }
// }

// // Uncomment the following line to run the example
// generateSampleContent();
