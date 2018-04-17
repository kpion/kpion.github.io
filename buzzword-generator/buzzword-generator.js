/*
 * vocabulary from  https://codepen.io/schuettemarkus/pen/MyNrPQ
 * @author: Konrad Papala.
 * Usage:
 * let buzzwordGenerator = new BuzzwordGenerator();
 * console.log(buzzwordGenerator.get());//default
 *  or:
 *  console.log(buzzwordGenerator.get('verbose'));//to make it more verbose, it's just one of the premade configs
 *  or:
 *  console.log(buzzwordGenerator.get('yoda'));
 *  or with user defined params:
	console.log(buzzwordGenerator.get({

	   adverbs: 2, //how many adverbs etc...
	   verbs: 1,
	   adjectives: 4,
	   nouns: 1,
		}));
 */
'use strict';
class BuzzwordGenerator {
	/*
	 * 
	 * @param {object} words - optional, your own words, defined as {adverbs:[], verbs:[], adjectives:[], nouns:[] }
	 */
	constructor(words = null) {

		this.configs = {

			default: {
				adverbs: 1, //how many adverbs etc...
				verbs: 1,
				adjectives: 1,
				nouns: 1,

				//applies to all the types above:
				putBeforeLast: ' and ',
				separator: ', ',
				//options: false, 'first' (capitalize first letter of first word)
				capitalize: 'first',
				order: ['adverbs', 'verbs', 'adjectives', 'nouns']
			},

			adjectivesOnly: {
				adverbs: 0, //how many adverbs etc...
				verbs: 0,
				adjectives: 3,
				nouns: 0
			},

			verbose: {
				adverbs: 2, //how many adverbs etc...
				verbs: 1,
				adjectives: 4,
				nouns: 2
			},
			
			yoda: {
				order: ['adverbs', 'adjectives', 'nouns',  'verbs']
			}


		};

		if (words) {
			this.words = words;
		} else {
			this.words = {
				adverbs: ['appropriately', 'assertively', 'authoritatively', 'collaboratively', 'compellingly', 'competently',
					'completely',
					'continually', 'conveniently', 'credibly', 'distinctively', 'dramatically', 'dynamically', 'efficiently',
					'energistically', 'enthusiastically', 'globally', 'holisticly', 'interactively', 'intrinsically',
					'objectively', 'proactively', 'professionally', 'progressively', 'quickly', 'seamlessly', 'synergistically',
					'uniquely'],

				verbs: ['actualize', 'administrate', 'aggregate', 'architect', 'benchmark', 'brand', 'build', 'communicate',
					'conceptualize',
					'coordinate', 'create', 'cultivate', 'customize', 'deliver', 'deploy', 'develop', 'disintermediate', 'disseminate',
					'drive', 'embrace', 'empower', 'enable', 'engage', 'engineer', 'enhance', 'evolve', 'expedite', 'exploit', 'extend',
					'fabricate', 'facilitate', 'fashion', 'formulate', 'foster', 'generate',
					'grow', 'harness', 'impact', 'implement', 'incentivize', 'incubate', 'initiate', 'innovate', 'integrate', 'iterate',
					'leverage existing', 'leverage other\'s', 'maintain', 'matrix', 'maximize', 'mesh', 'monetize', 'morph',
					'negotiate', 'network', 'optimize', 'orchestrate', 'plagiarize', 'predominate', 'procrastinate', 'productivate',
					'productize', 'promote', 'provide access to', 'pursue', 'reconceptualize', 'redefine', 're-engineer', 'reinvent',
					'repurpose', 'restore', 'revolutionize', 'scale', 'seize', 'simplify', 'strategize', 'streamline', 'supply',
					'syndicate', 'synergize', 'synthesize', 'target',
					'transform', 'transition', 'underwhelm', 'unleash', 'utilize', 'visualize', 'whiteboard'],

				adjectives: ['24/7', 'accurate', 'adaptive', 'alternative', 'B2B', 'B2C', 'backend', 'backward-compatible',
					'bleeding-edge', 'business',
					'client-based', 'client-centered', 'client-centric', 'client-focused', 'collaborative', 'compelling', 'competitive',
					'cooperative', 'corporate', 'cost effective', 'covalent', 'cross functional', 'cross-media', 'cross-platform',
					'cross-unit', 'customer directed', 'customized', 'cutting-edge', 'distinctive', 'distributed', 'diverse',
					'dynamic', 'economically sound', 'effective', 'efficient', 'emerging', 'empowered', 'enabled', 'end-to-end',
					'enterprise', 'error-free', 'ethical', 'excellent', 'exceptional', 'extensible', 'extensive', 'flexible',
					'focused', 'frictionless', 'front-end', 'fully researched', 'fully tested', 'functional', 'future-proof',
					'global', 'go forward', 'goal-oriented', 'granular', 'high standards in', 'high-payoff', 'high-quality',
					'highly efficient', 'impactful', 'inexpensive', 'innovative', 'integrated', 'interactive', 'interdependent',
					'intermandated', 'interoperable', 'intuitive', 'just in time', 'leveraged', 'long-term high-impact',
					'low-risk high-yield', 'magnetic', 'maintainable', 'market positioning', 'market-driven', 'mission-critical',
					'multidisciplinary', 'multifunctional', 'multimedia based', 'next-generation', 'one-to-one', 'open-source',
					'optimal', 'orthogonal', 'out-of-the-box', 'pandemic', 'parallel', 'performance based', 'plug-and-play',
					'premier', 'premium', 'principle-centered', 'proactive', 'process-centric', 'professional', 'progressive',
					'prospective', 'quality', 'real-time', 'reliable', 'resource-sucking', 'resource-maximizing', 'resource-leveling',
					'revolutionary', 'robust', 'scalable', 'seamless', 'stand-alone',
					'standardized', 'standards compliant', 'state of the art', 'sticky', 'strategic', 'superior', 'sustainable',
					'synergistic', 'tactical', 'team building', 'team driven', 'technically sound', 'timely', 'top-line',
					'transparent', 'turnkey', 'ubiquitous', 'unique', 'user-centric', 'user friendly', 'value-added',
					'vertical', 'viral', 'virtual',
					'visionary', 'web-enabled', 'wireless', 'world-class', 'worldwide', 'fungible', 'cloud-ready', 'elastic',
					'hyper-scale', 'on-demand', 'cloud-based'],

				nouns: ['action items', 'alignments', 'applications', 'architectures', 'bandwidth', 'benefits',
					'best practices', 'catalysts for change', 'channels', 'collaboration and idea-sharing', 'communities', 'content',
					'convergence', 'core competencies', 'customer service', 'data', 'deliverables', 'e-business', 'e-commerce',
					'e-markets',
					'e-tailers', 'e-services', 'experiences', 'expertise', 'functionalities', 'growth strategies', 'human capital',
					'ideas', 'imperatives', 'infomediaries', 'information', 'infrastructures', 'initiatives', 'innovation',
					'intellectual capital', 'interfaces', 'internal or "organic" sources', 'leadership', 'leadership skills',
					'manufactured products', 'markets', 'materials', 'meta-services', 'methodologies', 'methods of empowerment',
					'metrics',
					'mindshare', 'models', 'networks', 'niches', 'niche markets', 'opportunities', '"outside the box" thinking',
					'outsourcing',
					'paradigms', 'partnerships', 'platforms', 'portals', 'potentialities', 'process improvements', 'processes',
					'products',
					'quality vectors', 'relationships', 'resources', 'results', 'ROI', 'scenarios', 'schemas', 'services', 'solutions',
					'sources', 'strategic theme areas', 'supply chains', 'synergy', 'systems', 'technologies', 'technology',
					'testing procedures', 'total linkage', 'users', 'value', 'vortals', 'web-readiness', 'web services', 'fungibility',
					'clouds', 'nosql', 'storage', 'virtualization'
				]
			};
	}
	}

	/*
	 * returns ARRAY of random words from 'adverbs', 'verbs' etc.
	 * @param {string} type : 'adverbs', 'verbs', 'adjectives', 'nouns'
	 * @param {string} num - number of items to return
	 * @returns {array}
	 */
	getWords(type = 'adjectives', num = 1) {

		let result = [];
		let ourWords = this.words[type];
		if(!this.words[type]){//no words/terms for this type
			return null;
		}
		//just in case: 
		if (num > ourWords.length) {
			num = ourWords.length;
		}

		while (result.length < num) {
			let word = ourWords[Math.floor(Math.random() * (ourWords.length))];
			if (result.indexOf(word) > -1) {
				continue;
			}
			result.push(word);

		}
		return result;
	}
	/*
	 * returns random words as string, including separators  
	 * @param {string} type - one of:  'adverbs','verbs','adjectives','nouns'
	 * @param {int} num - number of words to return
	 * @param {string} separator - separator between each word/term
	 * @param {string} putBeforeLast - if not empty, this will be put before the last word (if set to ' and ' 
	 *  we can get eg. "client-centered, intuitive and reliable")
	 * @returns {string}
	 */
	getWordsString(type = 'adjectives', num = 1, separator = ' ', putBeforeLast = '') {
		let words = this.getWords(type, num);
		if(!words){//no words/terms for this type
			return '';
		}
		let result = '';
		let separatorNow = '';
		words.forEach((word, index) => {
			if (putBeforeLast && words.length > 1 && index === words.length - 1) {
				result += putBeforeLast + word;
			} else {
				result += separatorNow + word;
			}
			separatorNow = separator;
		});

		return result;
	}
	/*
	 * 
	 * @param {object|string} config
	 * @returns {String}
	 */
	get(config) {
		if (typeof config === 'string') {
			config = this.configs[config];
		}
		config = Object.assign({}, this.configs.default, config);

		let result = '';
		let typeSeparator = '';
		//example config order === ['adverbs', 'verbs', 'adjectives', 'nouns'] by def.
		//p.s. unfortunately we can't just read the config to get the order of types, because https://stackoverflow.com/questions/30076219/does-es6-introduce-a-well-defined-order-of-enumeration-for-object-properties
		config.order.forEach((type) => {
			if (config[type] > 0) {
				let words = this.getWordsString(type, config[type], config.separator, config.putBeforeLast);
				result += typeSeparator + words;
				typeSeparator = ' ';
			}
		});
		
		if (config.capitalize === 'first') {
			result = this.capitalizeFirstLetter(result);
		}
		return result;

	}
	
	
	getRandomizedConfig (level = 2, separator = ', ', putBeforeLast = ' and '){
		let result = {
			adverbs: this.randomInt(level), //how many adverbs etc...
			verbs: this.randomInt(level),
			adjectives: this.randomInt(level),
			nouns: this.randomInt(level),

			//applies to all the types above:
			putBeforeLast: putBeforeLast,
			separator: separator,
			//options: false, 'first' (capitalize first letter of first word)
			capitalize: 'first'
		};
		return result;
	}
	
	//some utils:
	
	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	randomInt(max){
		return Math.floor((Math.random() * max) +1);
	}
}




