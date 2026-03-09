// This script generates the scholarship tags + new coming-soon lessons
// to append to prophecies.ts
const fs = require('fs');

// === EDERSHEIM TAGS for existing lessons ===
const edersheimTags = {
  1: "Paraphrased with express reference to the Messiah in Targum Pseudo-Jonathan; the seed crushing the serpent's head applied to Messiah in multiple Midrashim",
  3: "Extensively discussed; Shiloh applied directly to Messiah in Targum Pseudo-Jon. with full Rabbinic commentary in Sanh. 98b",
  5: "Passover lamb typology connected to Messianic redemption in Talmudic sources",
  7: "Cited in Messianic context; sign applied to the Messianic era in Targum and Talmudic sources",
  8: "Applied to Messianic times and the light of the Messiah in Yalkut and Talmud",
  10: "Bethlehem as Messiah's birthplace attested via Gen 35:21 in Targum Pseudo-Jon.; Mic 5:2 cited in Talmudic discussion of Messianic origin",
  11: "Psalm 110 treated as Messianic throughout; eternal priesthood applied to Messiah in Rabbinic writings",
  12: "Explicitly quoted as Messianic in Talmud (Sukk. 52a); applied to the King Messiah in Midrash",
  13: "Applied in context of Messiah's betrayal; Psalm 41 cited in Messianic discussions in Talmud",
  14: "Messianically explained in Ber. R. 98; thirty pieces of silver applied to Messiah's betrayal",
  15: "Continuation of Zech 11 Messianic discourse; potter's field in Rabbinic sources",
  16: "Psalm 22 treated as Messianic Passion Psalm; verse cited in Yalkut on Messiah's sufferings",
  17: "Garments and lots within the Messianic Psalm 22; cited in Rabbinic writings on Messiah's derision",
  18: "Mocking expressly applied to Messiah's sufferings and derision from enemies in ancient Synagogue commentary",
  21: "Isaiah 53 treated as most significant Messianic chapter; Messiah's silence before accusers cited in Yalkut",
  22: "Stripes and healing applied to Messiah bearing Israel's sins in Talmud (Sanh. 98b) and Yalkut",
  23: "Burial with the rich in Messianic application of Isa 53 in ancient Rabbinic commentary",
  24: "Not suffering corruption applied to Messiah; cited in Rabbinic sources on resurrection hope",
  25: "Ascent on high and captivity applied to Messianic triumph in Talmud and Midrash",
  26: "Ps 110:1 explicitly Messianic; 'Sit at My right hand' applied to Messiah in Talmudic debate (Sanh. 38a)",
  27: "Servant as light to nations applied to Messianic era in Targum and Midrash",
  28: "Opening of blind eyes and ears cited in Messianic context in Yalkut on Isaiah",
  31: "Rejected stone becoming cornerstone cited as Messianic in Talmud and applied to Messiah in multiple Midrashim",
  32: "Humble King on donkey explicitly applied to Messiah in Talmud (Sanh. 98a) and Midrash with variant readings",
  35: "Righteous Branch (Tsemach) is one of the best-known Messianic designations; applied in Targum and multiple Midrashim",
  36: "Son of Man receiving everlasting dominion applied to the Messiah in Talmud and Targum on Daniel",
  40: "Despised and rejected applied to Messiah's suffering in Yalkut and Talmud (Sanh. 98b)",
  41: "Numbered with transgressors in Messianic application of Isa 53 in Talmud",
  42: "Intercession for transgressors applied to Messiah's work on behalf of the living and dead in Yalkut",
  43: "Swallowing up of death applied to Messianic era in Talmud (Moed Katan 28b) and Midrash",
  44: "Kingdom given to the people of the Most High applied to Messianic reign in Talmudic commentary",
  45: "Cornerstone in Zion applied to Messiah by Targum; noted by Rashi; Messiah as crown of glory (Isa 28:5)",
  47: "Everlasting light replacing sun and moon applied to Messianic era and the light of the Messiah in Yalkut",
  48: "Righteous Servant justifying many cited in Messianic application of Isaiah 53",
  49: "Redeemer coming to Zion applied to Messianic times in Sanh. 98a and Pesiqta 166b",
  50: "Child born, Son given; names of the Messiah extensively discussed in Talmud (Debarim R.) and Midrash",
  51: "Throne established forever applied to Messiah's eternal kingdom in Talmudic and Midrashic sources",
  52: "Servant upheld by God applied to Messiah in Targum and Midrash on Psalm 2",
  53: "Gentle servant applied to Messiah's ministry manner in Messianic commentary",
  54: "Opening blind eyes applied to Messiah's healing ministry in Yalkut on Isaiah 42",
  55: "Good news to the poor and liberty to captives applied to Messianic era in Talmud",
  56: "Year of the Lord's favor applied to Messianic proclamation in Rabbinic commentary",
  57: "New covenant promise applied to Messianic era; Jer 31:33-34 also cited in Yalkut",
  58: "'The LORD our Righteousness' cited as one of the Messiah's names in Talmud (Bava Batra 75b)",
  59: "Son of Man on clouds applied to Messiah in Talmud (Sanh. 98a) and Targum on Daniel",
  60: "Breaking of covenant staff in Messianic context of the rejected shepherd",
  63: "Opening cry of Psalm 22 applied to Messiah's suffering; entire psalm treated as Messianic in ancient Synagogue",
  64: "God will provide the lamb connected to Messianic redemption; Isaac as type of Messiah in Talmud and Midrash",
  65: "Star out of Jacob applied to the Messiah in Talmud; associated with Bar Kokhba as false messiah (Num. Rab.)",
  67: "Curse of one hanged on a tree in Messianic/atonement context in Talmudic sources",
  69: "Nations conspiring against God's anointed applied to opposition to the Messiah in Talmud",
  71: "Into Your hands cited in Messianic context of suffering and trust in Midrash",
  72: "False witnesses rising up cited in Messianic commentary on Messiah's trial",
  73: "Doing God's will cited as Messianic in Talmud; scroll of the book applied to Messiah",
  74: "Psalm 45 thoroughly Messianic in Targum; 'Your throne, O God' applied to Messiah's eternal kingship",
  76: "Kings bringing gifts applied to the Messiah; entire Psalm 72 viewed as Messianic in Yalkut",
  77: "Unchanging Creator applied to Messiah in Talmud; Ps 102:16 applied to Messianic times in Bereshith R.",
  79: "Ever hearing never understanding applied to those rejecting Messiah's message in Midrash",
  80: "Branch from Jesse and Spirit of the LORD extensively applied to Messiah in Targum, Talmud, and Midrash",
  81: "Root of Jesse as signal to nations applied to Messianic gathering in Talmud and Yalkut",
  82: "Voice in the wilderness preparing the way applied to Messianic forerunner in Rabbinic commentary",
  83: "Light for the Gentiles applied to Messiah's universal mission in Talmud and Midrash",
  84: "Back given to those who strike applied to Messiah's suffering in Yalkut on Isaiah 50",
  85: "Disfigured appearance applied to Messiah's suffering; Isa 52-53 treated as continuous Messianic passage",
  86: "Taking our infirmities applied to Messiah bearing Israel's diseases in Talmud (Sanh. 98b)",
  87: "Beautiful feet of herald applied to Messianic proclamation; cited in Yalkut with three-day Elijah scenario",
  88: "Everlasting covenant and sure mercies of David applied to Messianic era in Talmud",
  89: "Rachel weeping cited in Messianic context of exile and return in Midrash Rabbah",
  90: "God setting up a kingdom destroying all others applied to Messianic era in Talmud",
  96: "Priest on His throne; Branch building the Temple applied to Messiah in Zechariah Targum",
  98: "Feet on Mount of Olives applied to Messianic advent in Targum on Zechariah 14",
  99: "Cut off from the living in full Messianic treatment of Isaiah 53",
  100: "Sons of the living God applied to Messianic restoration of Israel in Midrash"
};

// === McDOWELL TAGS for existing lessons ===
// Maps existing lesson ID -> McDowell data
const mcdowellTags = {
  1:  { num: 1,  title: "Born of the Seed of Woman",          note: "First Messianic promise; seed of woman crushes serpent — cited with Targum Jonathan" },
  2:  { num: 4,  title: "Seed of Abraham",                    note: "Galatians 3:16 — 'seed' singular; Matthew Henry cited on universal blessing through one descendant" },
  3:  { num: 7,  title: "Tribe of Judah",                     note: "Scepter passage with Targum Jonathan cited verbatim; Hengstenberg commentary included" },
  4:  { num: 16, title: "Shall Be a Prophet",                 note: "Maimonides letter to Yemen cited; Kligerman on Jewish expectation of Messianic prophet" },
  7:  { num: 2,  title: "Born of a Virgin",                   note: "Greek LXX uses parthenos; Targum Isaiah cited; Immanuel also listed separately as #15" },
  8:  { num: 23, title: "Ministry to Begin in Galilee",       note: "Galilee of Gentiles illuminated; Capernaum as fulfillment — Matt 4:12 cited" },
  9:  { num: 26, title: "He Was to Enter the Temple",         note: "Lord suddenly coming to His temple; John 1:14 and 2:19-21 cited as fulfillments" },
  10: { num: 10, title: "Born at Bethlehem",                  note: "Scribes cited in Matt 2:4; Hengstenberg commentary; pre-existence in same verse noted as #13" },
  11: { num: 17, title: "Priest",                             note: "Eternal Melchizedek priesthood; oath of God distinguishes from Aaronic priesthood" },
  12: { num: 3,  title: "Son of God",                         note: "Quoted as Messianic in Talmud (Sukk. 52a); Father's declaration at baptism" },
  13: { num: 33, title: "Betrayed by a Friend",               note: "Familiar friend who ate bread; 'man of my peace' — Judas's kiss of betrayal" },
  14: { num: 34, title: "Sold for Thirty Pieces of Silver",   note: "Seven precise details fulfilled: friend, 30 pieces, silver, thrown, house of Lord, potter" },
  15: { num: 35, title: "Money Thrown into God's House",       note: "Thrown (not placed) into the temple — Matt 27:5 exact fulfillment; also #36 Price Given for Potter's Field" },
  16: { num: 44, title: "Hands and Feet Pierced",             note: "Roman crucifixion method; large dull spikes; Zech 12:10 cited as parallel" },
  18: { num: 42, title: "Mocked",                             note: "Shoot out the lip, shake the head — Psalm 22 treated as full Passion Psalm by McDowell" },
  19: { num: 53, title: "To Suffer Thirst",                   note: "Vinegar for thirst; John 19:28 — 'I thirst'; also covered by #54 Gall and Vinegar Offered" },
  20: { num: 59, title: "His Side Pierced",                   note: "Laetsch — LORD Jehovah speaks of Himself as pierced; 'thrust through' appears 9x in OT" },
  21: { num: 39, title: "Silent before Accusers",             note: "Oppressed and afflicted, opened not His mouth; Matt 27:12 fulfillment noted" },
  22: { num: 40, title: "Wounded and Bruised",                note: "Stripes for our healing; Henry cited; Zech 13:6 as parallel" },
  23: { num: 61, title: "Buried in a Rich Man's Tomb",        note: "Grave with wicked but tomb with rich; Joseph of Arimathea — Stoner probability cited" },
  24: { num: 30, title: "Resurrection",                       note: "Soul not left in Sheol; Friedlaender on Ibn Ezra's belief in resurrection; Acts 2:31" },
  25: { num: 31, title: "Ascension",                          note: "Ascended on high; Acts 1:9 fulfillment; captivity led captive" },
  26: { num: 14, title: "He Shall Be Called Lord",            note: "Midrash Tehillim cited; Matt 22:43-45 — David calls Him Lord in the Spirit; also #32 Seated at Right Hand" },
  28: { num: 24, title: "Ministry of Miracles",               note: "Blind, deaf, lame, mute healed; Isaiah 32:3-4 also cited; Matt 11:4 fulfillment" },
  29: { num: 25, title: "Teacher of Parables",                note: "Parable method predicted; Matt 13:34 — without a parable He did not speak" },
  30: { num: 21, title: "His Zeal for God",                   note: "Fausset cited on John 2:17 as specimen of Messiah's zeal; reproaches falling on Him" },
  31: { num: 29, title: "Rejected Cornerstone",               note: "Stone builders rejected became chief cornerstone; Matt 21:42 fulfillment" },
  32: { num: 27, title: "He Was to Enter Jerusalem on a Donkey", note: "Humble King; Talmud (Sanh. 98a) cited — if Israel worthy, He comes on clouds; if not, on donkey" },
  33: { num: 37, title: "Forsaken by His Disciples",          note: "Laetsch cited on Zech 13:7 as clear prophecy; Christ's own interpretation in Matt 26:31" },
  35: { num: 9,  title: "House of David",                     note: "Righteous Branch; Messiah called Son of David throughout both Talmuds" },
  40: { num: 47, title: "Rejected by His Own People",         note: "Henry cited; own brethren disbelieved (John 7:5); own received Him not (John 1:11)" },
  41: { num: 45, title: "Crucified with Thieves",             note: "Numbered with transgressors; crucifixion unknown in Jewish law — Blinzler cited" },
  42: { num: 46, title: "Made Intercession for Persecutors",  note: "Fausset — began on cross (Luke 23:34), continues in heaven (Heb 9:24; 1 John 2:1)" },
  61: { num: 60, title: "Darkness over the Land",             note: "Sun darkened at noon; sixth hour = noon, ninth = 3pm by Jewish reckoning; Matt 27:45" },
  63: { num: 55, title: "His Forsaken Cry",                   note: "Double cry 'My God' implies clinging to God while forsaken; Matt 27:46 verbatim" },
  65: { num: 6,  title: "Son of Jacob",                       note: "Star out of Jacob applied to Messiah; eliminates half of Abraham's lineage toward Christ" },
  71: { num: 56, title: "Committed Himself to God",           note: "Into Your hand I commit my spirit; Luke 23:46 — last words on the cross" },
  72: { num: 38, title: "Accused by False Witnesses",         note: "Fierce witnesses rise up; Matt 26:60 — false witnesses sought, found none" },
  75: { num: 48, title: "Hated Without a Cause",              note: "More haters than hairs; John 15:25 — their own law quotes this word as fulfilled" },
  76: { num: 11, title: "Presented with Gifts",               note: "Kings of Sheba bringing gifts fulfilled by Magi; Isaiah 60:6 cited as parallel" },
  80: { num: 8,  title: "Family Line of Jesse",               note: "Targum Isaiah: 'A King shall come forth from the sons of Jesse'; also #20 Special Anointing of Holy Spirit" },
  82: { num: 22, title: "Preceded by Messenger",              note: "John Baptist as forerunner; Mal 3:1 cited in parallel; Luke 1:17 included" },
  84: { num: 41, title: "Smitten and Spit Upon",              note: "Back to strikers, cheeks to beard-pluckers; Henry commentary; Matt 26:67 fulfillment" },
  89: { num: 12, title: "Herod Kills Children",               note: "Rachel weeping; Laetsch cited defending Matthew's typological application of Jeremiah 31" },
};

// === NEW EDERSHEIM COMING-SOON LESSONS ===
const edersheimNewLessons = [
  { id: 101, slug: "all-things-new",             title: "All Things New",                  cat: "Identity",     ot: "Genesis 2:4",         nt: "Revelation 21:5",     note: "Messianic generations interpretation; Fall and restoration via Messiah (Ber. R. 12)" },
  { id: 102, slug: "seed-of-seth",               title: "Seed of Seth",                    cat: "Identity",     ot: "Genesis 4:25",        nt: "Luke 3:38",           note: "Seth birth — another seed refers to the Messiah (Ber. R. 23)" },
  { id: 103, slug: "gentiles-welcomed",           title: "Gentiles Welcomed",               cat: "Ministry",     ot: "Genesis 9:27",        nt: "Ephesians 2:13",      note: "Japheth dwelling in Shem tents — Gentile inclusion in Messianic age (Targum Pseudo-Jon.)" },
  { id: 104, slug: "heaven-opened",               title: "Heaven Opened",                   cat: "Identity",     ot: "Genesis 28:10",       nt: "John 1:51",           note: "Jacob ladder — Messianic commentary in Talmud on divine-human connection" },
  { id: 105, slug: "born-before-the-enemy",        title: "Born Before the Enemy",           cat: "Identity",     ot: "Genesis 33:1",        nt: "Revelation 12:5",     note: "Midrash conjoins with Isa 66:7 — Messiah born before oppressor comes" },
  { id: 106, slug: "gods-firstborn",               title: "God's Firstborn",                 cat: "Identity",     ot: "Exodus 4:22",         nt: "Matthew 2:15",        note: "Israel as God firstborn son — applied to Messiah in Midr. on Ps 2:7" },
  { id: 107, slug: "hidden-manna-revealed",        title: "Hidden Manna Revealed",           cat: "Ministry",     ot: "Exodus 16:33",        nt: "Revelation 2:17",     note: "Preserved manna to be revealed by Messiah in Mechilta" },
  { id: 108, slug: "final-victory",                title: "Final Victory",                   cat: "Resurrection", ot: "Exodus 17:16",        nt: "Revelation 19:11",    note: "War with Amalek — Targum Pseudo-Jon. refers to Messianic times" },
  { id: 109, slug: "fulfiller-of-the-law",         title: "Fulfiller of the Law",            cat: "Ministry",     ot: "Exodus 21:1",         nt: "Matthew 5:17",        note: "Judgments and Messianic connections noted in Shem. R. 30" },
  { id: 110, slug: "yoke-broken",                  title: "Yoke Broken",                    cat: "Ministry",     ot: "Leviticus 26:13",     nt: "Luke 4:18",           note: "Breaking of the yoke applied to Messianic liberation (Ber. R. 12)" },
  { id: 111, slug: "all-things-restored",           title: "All Things Restored",             cat: "Resurrection", ot: "Numbers 7:12",        nt: "Revelation 21:4",     note: "Six lost blessings restored through Messiah (Num. R.)" },
  { id: 112, slug: "spirit-without-measure",        title: "Spirit Without Measure",          cat: "Identity",     ot: "Numbers 27:16",       nt: "John 3:34",           note: "Spirit of God — His Spirit worth all others combined; Messianic application" },
  { id: 113, slug: "the-meek-inherit",              title: "The Meek Inherit",                cat: "Resurrection", ot: "Deuteronomy 1:8",     nt: "Matthew 5:5",         note: "Promise of the land applied to Messianic era (Siphre 67a)" },
  { id: 114, slug: "the-firstborn-glory",           title: "The Firstborn Glory",             cat: "Identity",     ot: "Deuteronomy 33:17",   nt: "Revelation 5:5",      note: "Tanchuma applies beauty of firstling bullock to the Messiah" },
  { id: 115, slug: "righteous-shine-like-the-sun",  title: "Righteous Shine Like the Sun",    cat: "Resurrection", ot: "Judges 5:31",         nt: "Matthew 13:43",       note: "Sun rising in might applied to Messianic times (Talmud)" },
  { id: 116, slug: "son-of-pharez",                 title: "Son of Pharez",                   cat: "Identity",     ot: "Ruth 4:18",           nt: "Matthew 1:3",         note: "Messiah called Son of Pharez — restorer of six lost blessings (Ber. R. 12)" },
  { id: 117, slug: "horn-of-salvation",             title: "Horn of Salvation",               cat: "Identity",     ot: "1 Samuel 2:10",       nt: "Luke 1:69",           note: "Horn of anointed exalted — Targum and Midrashim apply to Messiah" },
  { id: 118, slug: "the-humble-exalted",            title: "The Humble Exalted",              cat: "Ministry",     ot: "2 Samuel 22:28",      nt: "Luke 1:52",           note: "Talmud (Sanh. 98a) — humbling the haughty in Messianic days" },
  { id: 119, slug: "david-final-vision",            title: "David Final Vision",              cat: "Identity",     ot: "2 Samuel 23:1",       nt: "Luke 1:32",           note: "Targum applies David last words to Messianic prophecy" },
  { id: 120, slug: "messiah-raises-the-dead",       title: "Messiah Raises the Dead",         cat: "Resurrection", ot: "2 Samuel 23:3",       nt: "John 5:28",           note: "Ruling in fear of God — Targum applies to Messiah raising the dead" },
  { id: 121, slug: "rod-of-iron",                   title: "Rod of Iron",                     cat: "Resurrection", ot: "Psalm 2:9",           nt: "Revelation 2:27",     note: "Nations as iron-shattered inheritance applied to Messiah in Ber. R. 44" },
  { id: 122, slug: "the-cup-of-the-lord",           title: "The Cup of the Lord",             cat: "Passion",      ot: "Psalm 16:5",          nt: "Matthew 26:39",       note: "Midrash applies Messiah portion to Pharaoh butler cup vision (Ber. R. 88)" },
  { id: 123, slug: "works-prove-his-mission",       title: "Works Prove His Mission",         cat: "Ministry",     ot: "Psalm 18:31",         nt: "John 10:38",          note: "Targum applies God works and miracles to the Messiah" },
  { id: 124, slug: "his-anointed",                   title: "His Anointed",                    cat: "Identity",     ot: "Psalm 18:50",         nt: "Matthew 1:1",         note: "Great deliverance to His king — Jer. Talmud applies to Messiah" },
  { id: 125, slug: "crowned-with-gold",              title: "Crowned with Gold",               cat: "Identity",     ot: "Psalm 21:3",          nt: "Revelation 19:12",    note: "Crown of pure gold and length of days applied to King Messiah in Midrash" },
  { id: 126, slug: "fairer-than-the-sons-of-men",   title: "Fairer Than the Sons of Men",     cat: "Identity",     ot: "Psalm 45:2",          nt: "Hebrews 1:8",         note: "Targum: Thy beauty O King Messiah surpasses that of human children" },
  { id: 127, slug: "tribes-of-the-redeemed",         title: "Tribes of the Redeemed",          cat: "Identity",     ot: "Psalm 60:7",          nt: "Revelation 7:4",      note: "Gilead and Ephraim — Messianic discussion in Bemidbar R. 14" },
  { id: 128, slug: "days-without-end",               title: "Days Without End",                cat: "Resurrection", ot: "Psalm 61:6",          nt: "Revelation 11:15",    note: "Days added to the King — Targum applies to eternal Messianic reign" },
  { id: 129, slug: "sun-and-moon-endure",             title: "Sun and Moon Endure",             cat: "Identity",     ot: "Psalm 72:1",          nt: "Luke 1:33",           note: "Entire Psalm 72 viewed as Messianic in Yalkut and ancient Synagogue commentary" },
  { id: 130, slug: "sorrow-repaid-with-joy",          title: "Sorrow Repaid with Joy",          cat: "Resurrection", ot: "Psalm 90:15",         nt: "Revelation 21:4",     note: "Days of affliction repaid in Messianic days — Midrash on Ps 90" },
  { id: 131, slug: "enemies-made-a-footstool",        title: "Enemies Made a Footstool",        cat: "Resurrection", ot: "Psalm 92:8",          nt: "Hebrews 1:13",        note: "Verses 8, 11, 13 Messianically interpreted in Pirque de R. El." },
  { id: 132, slug: "today",                           title: "Today",                           cat: "Ministry",     ot: "Psalm 95:7",          nt: "Hebrews 3:15",        note: "Today if you hear His voice — applied to Messiah coming in Shem. R. 25" },
  { id: 133, slug: "zion-rebuilt",                     title: "Zion Rebuilt",                    cat: "Resurrection", ot: "Psalm 102:16",        nt: "Revelation 21:2",     note: "Bereshith R. 56 applies to Messianic times — LORD rebuilds Zion" },
  { id: 134, slug: "he-remembered-his-people",        title: "He Remembered His People",        cat: "Resurrection", ot: "Psalm 106:44",        nt: "Luke 1:54",           note: "Long Messianic discussion on God faithfulness in Midrash" },
  { id: 135, slug: "i-am-for-peace",                   title: "I Am for Peace",                  cat: "Ministry",     ot: "Psalm 120:7",         nt: "John 14:27",          note: "Applied to Messiah — peace against opposition in Midrash" },
  { id: 136, slug: "my-help-comes",                    title: "My Help Comes",                   cat: "Ministry",     ot: "Psalm 121:1",         nt: "Luke 2:30",           note: "Tanchuma applies to Messianic deliverance" },
  { id: 137, slug: "mouths-filled-with-laughter",      title: "Mouths Filled with Laughter",     cat: "Resurrection", ot: "Psalm 126:2",         nt: "John 16:22",          note: "Applied to Messianic joy — laughter among the nations" },
  { id: 138, slug: "hidden-wisdom-revealed",           title: "Hidden Wisdom Revealed",          cat: "Ministry",     ot: "Ecclesiastes 7:24",   nt: "Matthew 13:35",       note: "Targum: remote from man but revealed by Messiah — the deep things of Torah" },
  { id: 139, slug: "purified-for-judgment",             title: "Purified for Judgment",           cat: "Resurrection", ot: "Isaiah 1:25",         nt: "Matthew 25:31",       note: "Talmud (Sanh. 98a): Son of David comes after purging of judges" },
  { id: 140, slug: "true-vine-true-branch",             title: "True Vine, True Branch",          cat: "Identity",     ot: "Isaiah 4:2",          nt: "John 15:1",           note: "Targum: Branch of the LORD applied to Messianic times" },
  { id: 141, slug: "the-holy-remnant",                  title: "The Holy Remnant",                cat: "Resurrection", ot: "Isaiah 6:13",         nt: "Romans 11:5",         note: "Talmud (Keth. 112b) applies holy seed/stump to Messianic times" },
  { id: 142, slug: "stone-of-stumbling",                title: "Stone of Stumbling",              cat: "Rejection",    ot: "Isaiah 8:14",         nt: "1 Peter 2:8",         note: "Talmud (Sanh. 38a) applies stone of stumbling Messianically" },
  { id: 143, slug: "yoke-destroyed",                    title: "Yoke Destroyed",                  cat: "Resurrection", ot: "Isaiah 10:27",        nt: "Revelation 19:15",    note: "Targum: Messiah destroys Gentile oppressors before His coming" },
  { id: 144, slug: "root-and-offspring",                title: "Root and Offspring",              cat: "Identity",     ot: "Isaiah 14:29",        nt: "Revelation 22:16",    note: "Rod out of Jesse — Messianically applied in Targum" },
  { id: 145, slug: "end-of-the-night",                  title: "End of the Night",                cat: "Ministry",     ot: "Isaiah 21:11",        nt: "John 8:12",           note: "Watchman, what of the night — applied to Messiah manifestation in Jer. Taan." },
  { id: 146, slug: "before-abraham-was",                title: "Before Abraham Was",              cat: "Identity",     ot: "Isaiah 23:15",        nt: "John 8:58",           note: "Talmud (Sanh. 99a) — seventy years applied to Messiah lifespan comparison" },
  { id: 147, slug: "the-lord-reigns",                   title: "The LORD Reigns",                 cat: "Resurrection", ot: "Isaiah 24:23",        nt: "Revelation 5:13",     note: "Bemidbar R. — LORD of hosts reigns on Mount Zion in Messianic era" },
  { id: 148, slug: "crown-of-glory",                    title: "Crown of Glory",                  cat: "Identity",     ot: "Isaiah 28:5",         nt: "1 Peter 5:4",         note: "Targum: Messiah of the LORD of hosts will be a crown of glory" },
  { id: 149, slug: "god-patient-grace",                  title: "God Patient Grace",               cat: "Ministry",     ot: "Isaiah 30:18",        nt: "2 Peter 3:9",         note: "Sanhedrin 97b — God waits to be gracious; Messianic timing" },
  { id: 150, slug: "spirit-on-the-waste-places",        title: "Spirit on the Waste Places",      cat: "Resurrection", ot: "Isaiah 32:14",        nt: "Acts 2:17",           note: "Midrash of Lamentations: Spirit poured out in Messianic days" },
  { id: 151, slug: "comfort-has-come",                   title: "Comfort Has Come",                cat: "Ministry",     ot: "Isaiah 40:1",         nt: "Luke 2:25",           note: "Comfort ye — applied to Messianic comfort in Rabbinic sources" },
  { id: 152, slug: "the-one-who-comes",                  title: "The One Who Comes",               cat: "Identity",     ot: "Isaiah 41:25",        nt: "Revelation 5:5",      note: "Bemidbar R. — One from the north stirred up; applied to Messiah" },
  { id: 153, slug: "the-acceptable-time",                title: "The Acceptable Time",             cat: "Passion",      ot: "Isaiah 49:8",         nt: "2 Corinthians 6:2",   note: "Yalkut: Messiah suffering — in a time of favor I answered you" },
  { id: 154, slug: "free-the-captives",                  title: "Free the Captives",               cat: "Ministry",     ot: "Isaiah 49:9",         nt: "Luke 4:18",           note: "Yalkut (vol ii 52b) quotes this as the words of the Messiah to prisoners" },
  { id: 155, slug: "the-comforter-comes",                title: "The Comforter Comes",             cat: "Resurrection", ot: "Isaiah 51:12",        nt: "John 14:16",          note: "Midrash of Lamentations — comfort in Messianic days" },
  { id: 156, slug: "redeemed-without-money",             title: "Redeemed Without Money",          cat: "Passion",      ot: "Isaiah 52:3",         nt: "1 Peter 1:18",        note: "Talmud (Sanh. 97b) — redeemed without price applied to Messiah" },
  { id: 157, slug: "other-sheep-i-have",                 title: "Other Sheep I Have",              cat: "Ministry",     ot: "Isaiah 54:2",         nt: "John 10:16",          note: "Vayyikra R. 10 — tent enlarged in Messianic times" },
  { id: 158, slug: "the-bride-husband",                  title: "The Bride Husband",               cat: "Resurrection", ot: "Isaiah 54:5",         nt: "Revelation 21:9",     note: "Shemoth R. 15 — God as husband expressly applied to Messianic days" },
  { id: 159, slug: "jeweled-foundations",                 title: "Jeweled Foundations",             cat: "Resurrection", ot: "Isaiah 54:11",        nt: "Revelation 21:19",    note: "Shemoth R. 15 — jeweled foundations in Messianic glory" },
  { id: 160, slug: "creation-set-free",                   title: "Creation Set Free",               cat: "Resurrection", ot: "Isaiah 55:12",        nt: "Romans 8:21",         note: "Midrash on Ps 13 — trees clapping hands applied to Messianic era" },
  { id: 161, slug: "i-am-the-light",                     title: "I Am the Light",                  cat: "Ministry",     ot: "Isaiah 60:1",         nt: "John 8:12",           note: "Targum and Ber. R. — arise shine applied to Messiah bringing light" },
  { id: 162, slug: "the-way-prepared",                    title: "The Way Prepared",                cat: "Ministry",     ot: "Isaiah 62:10",        nt: "John 14:6",           note: "Applied to Messianic highway in Rabbinic sources" },
  { id: 163, slug: "garments-of-vengeance",               title: "Garments of Vengeance",           cat: "Resurrection", ot: "Isaiah 63:1",         nt: "Revelation 19:13",    note: "Applied to Messiah coming after destruction of Gentiles in Midrash" },
  { id: 164, slug: "what-no-eye-has-seen",                title: "What No Eye Has Seen",            cat: "Resurrection", ot: "Isaiah 64:4",         nt: "1 Corinthians 2:9",   note: "Yalkut on Isa 60 — things prepared for the righteous in Messianic era" },
  { id: 165, slug: "new-heavens-new-earth",               title: "New Heavens New Earth",           cat: "Resurrection", ot: "Isaiah 65:17",        nt: "Revelation 21:1",     note: "Midrash on Lamentations — new heavens and earth in Messianic times" },
  { id: 166, slug: "born-before-the-pain",                title: "Born Before the Pain",            cat: "Identity",     ot: "Isaiah 66:7",         nt: "Revelation 12:5",     note: "Vayyikra R. 14 — child born before Zion travails; Messiah before oppressor" },
  { id: 167, slug: "the-throne-in-jerusalem",             title: "The Throne in Jerusalem",         cat: "Resurrection", ot: "Jeremiah 3:17",       nt: "Revelation 22:3",     note: "Yalkut on Josh 3:9 — Jerusalem throne of God in Messianic days" },
  { id: 168, slug: "will-he-find-faith",                  title: "Will He Find Faith",              cat: "Rejection",    ot: "Jeremiah 5:19",       nt: "Luke 18:8",           note: "Echa R. — one of three passages inferring apostasy before Messiah" },
  { id: 169, slug: "he-who-draws-near",                   title: "He Who Draws Near",               cat: "Identity",     ot: "Jeremiah 30:21",      nt: "Hebrews 7:25",        note: "Targum applies — Messiah as noble ruler who approaches God" },
  { id: 170, slug: "law-on-our-hearts",                   title: "Law on Our Hearts",               cat: "Resurrection", ot: "Jeremiah 31:33",      nt: "Hebrews 8:10",        note: "Law written on hearts — applied to Messianic covenant in Yalkut" },
  { id: 171, slug: "he-calls-his-own",                    title: "He Calls His Own",                cat: "Ministry",     ot: "Jeremiah 33:13",      nt: "John 10:3",           note: "Targum: people shall pass under the hands of the Messiah to be numbered" },
  { id: 172, slug: "liberty-proclaimed",                   title: "Liberty Proclaimed",              cat: "Ministry",     ot: "Lamentations 2:22",   nt: "Luke 4:18",           note: "Targum — Messiah proclaims liberty in Messianic era" },
  { id: 173, slug: "it-is-finished",                      title: "It Is Finished",                  cat: "Passion",      ot: "Lamentations 4:22",   nt: "John 19:30",          note: "Targum — iniquity finished; Messiah atoning work complete" },
  { id: 174, slug: "heart-of-stone-removed",              title: "Heart of Stone Removed",          cat: "Resurrection", ot: "Ezekiel 11:19",       nt: "Ezekiel 36:26",       note: "Applied to Messianic spiritual renewal — evil desire removed (Talmud)" },
  { id: 175, slug: "times-of-restoration",                title: "Times of Restoration",            cat: "Resurrection", ot: "Ezekiel 16:55",       nt: "Acts 3:21",           note: "Ten things renewed in Messianic days including rebuilding ruins (Midrash)" },
  { id: 176, slug: "judgment-of-the-nations",             title: "Judgment of the Nations",         cat: "Resurrection", ot: "Ezekiel 25:14",       nt: "Revelation 19:14",    note: "Destruction of nations by Israel in Messianic days (Bemidbar R.)" },
  { id: 177, slug: "horn-springing-forth",                title: "Horn Springing Forth",            cat: "Identity",     ot: "Ezekiel 29:21",       nt: "Luke 1:69",           note: "Messiah coming — horn of Israel to spring forth (Sanh. 98a)" },
  { id: 178, slug: "final-battle",                        title: "Final Battle",                    cat: "Resurrection", ot: "Ezekiel 39:2",        nt: "Revelation 20:8",     note: "Bemidbar R. 13 — Messianic battle with Gog and Magog" },
  { id: 179, slug: "river-of-life",                       title: "River of Life",                   cat: "Resurrection", ot: "Ezekiel 47:9",        nt: "Revelation 22:2",     note: "Shem. R. 15 — living waters and healing trees in Messianic era" },
  { id: 180, slug: "two-thrones",                         title: "Two Thrones",                     cat: "Identity",     ot: "Daniel 7:9",          nt: "Revelation 3:21",     note: "R. Akiba — two thrones: one for God, one for Messiah (Talmud Hag. 14a)" },
  { id: 181, slug: "glory-restored",                      title: "Glory Restored",                  cat: "Resurrection", ot: "Daniel 8:13",         nt: "Romans 8:18",         note: "Ber. R. 21 — man lost glory restored in Messianic days" },
  { id: 182, slug: "seventy-weeks",                       title: "Seventy Weeks",                   cat: "Identity",     ot: "Daniel 9:24",         nt: "Luke 21:24",          note: "Naz. 32b — seventy weeks until second Temple destroyed; Messianic timing" },
  { id: 183, slug: "great-tribulation",                   title: "Great Tribulation",               cat: "Resurrection", ot: "Daniel 12:1",         nt: "Matthew 24:21",       note: "Shem. R. 15 — time of trouble and deliverance applied to Messianic era" },
  { id: 184, slug: "scattered-children-gathered",         title: "Scattered Children Gathered",     cat: "Resurrection", ot: "Hosea 2:2",           nt: "John 11:52",          note: "Midr. on Ps 45:1 — Israel redemption when reunited under one head" },
  { id: 185, slug: "david-my-servant",                    title: "David My Servant",                cat: "Identity",     ot: "Hosea 3:5",           nt: "Luke 1:32",           note: "Targum — David raised up; Jer. Talmud derives Messiah name from David" },
  { id: 186, slug: "raised-on-the-third-day",             title: "Raised on the Third Day",         cat: "Resurrection", ot: "Hosea 6:2",           nt: "Luke 24:46",          note: "Messianically applied in Targum — raised up on the third day" },
  { id: 187, slug: "death-swallowed-up",                  title: "Death Swallowed Up",              cat: "Resurrection", ot: "Hosea 13:14",         nt: "1 Corinthians 15:55", note: "Messiah delivers those of Israel in Gehinnom — sets free from death" },
  { id: 188, slug: "grain-falling-into-earth",            title: "Grain Falling into Earth",        cat: "Resurrection", ot: "Hosea 14:7",          nt: "John 12:24",          note: "Messianically applied in Targum — reviving like grain" },
  { id: 189, slug: "all-nations-gathered",                title: "All Nations Gathered",            cat: "Resurrection", ot: "Joel 3:2",            nt: "Matthew 25:32",       note: "Midrashim apply valley of Jehoshaphat to Messianic judgment of nations" },
  { id: 190, slug: "before-the-day-comes",                title: "Before the Day Comes",            cat: "Resurrection", ot: "Amos 4:13",           nt: "Revelation 8:1",      note: "Midr. on Cant 2:13 — applied to first of seven years before Messiah" },
  { id: 191, slug: "the-day-of-the-lord",                 title: "The Day of the Lord",             cat: "Ministry",     ot: "Amos 5:18",           nt: "Luke 17:26",          note: "Talmud (Sanh. 98b) — Rabbis warn those expecting Messiah day" },
  { id: 192, slug: "swords-into-plowshares",              title: "Swords into Plowshares",          cat: "Resurrection", ot: "Micah 4:3",           nt: "Isaiah 2:4",          note: "Talmud (Shabb. 63a) — swords into plowshares in Messianic times" },
  { id: 193, slug: "every-knee-shall-bow",                title: "Every Knee Shall Bow",            cat: "Resurrection", ot: "Micah 4:5",           nt: "Philippians 2:10",    note: "Shemoth R. 15 — all nations walk in God name in Messianic era" },
  { id: 194, slug: "four-craftsmen",                      title: "Four Craftsmen",                  cat: "Identity",     ot: "Zechariah 1:20",      nt: "Revelation 7:4",      note: "Four craftsmen applied to Messianic figures in Talmud (Sukk. 52b)" },
  { id: 195, slug: "god-dwells-among-us",                 title: "God Dwells Among Us",             cat: "Identity",     ot: "Zechariah 2:10",      nt: "John 1:14",           note: "Messianic passage — God dwelling among His people in Rabbinic sources" },
  { id: 196, slug: "mountain-made-plain",                 title: "Mountain Made Plain",             cat: "Ministry",     ot: "Zechariah 4:7",       nt: "Matthew 21:21",       note: "Generally applied to Messiah in Targum and Midrashim — the great mountain" },
  { id: 197, slug: "life-abundantly",                     title: "Life Abundantly",                 cat: "Resurrection", ot: "Zechariah 8:12",      nt: "John 10:10",          note: "Applied to Messianic abundance (Ber. R. 12)" },
  { id: 198, slug: "greeks-seek-jesus",                   title: "Greeks Seek Jesus",               cat: "Ministry",     ot: "Zechariah 8:23",      nt: "John 12:20",          note: "Ten Gentiles grasp Jewish garment — Messianic ingathering in Rabbinic sources" },
  { id: 199, slug: "chief-cornerstone",                   title: "Chief Cornerstone",               cat: "Identity",     ot: "Zechariah 10:4",      nt: "Ephesians 2:20",      note: "Messianically applied in Targum — cornerstone, nail, battle bow" },
  { id: 200, slug: "they-shall-mourn",                    title: "They Shall Mourn",                cat: "Passion",      ot: "Zechariah 12:12",     nt: "Revelation 1:7",      note: "Mourning for the pierced one — each family mourns separately (Talmud Sukk. 52a)" },
  { id: 201, slug: "lion-of-judah",                       title: "Lion of Judah",                   cat: "Identity",     ot: "Genesis 49:8",        nt: "Revelation 5:5",      note: "Lion whelp applied to the Messiah in Yalkut 160; Targum Pseudo-Jon. applies to Messiah kingship" },
  { id: 202, slug: "the-messiah-abundance",               title: "The Messiah Abundance",           cat: "Identity",     ot: "Genesis 49:12",       nt: "John 2:11",           note: "Applied to Messianic abundance and joy in Targum Pseudo-Jon. and Jerusalem Targum" },
  { id: 203, slug: "nations-as-inheritance",               title: "Nations as Inheritance",          cat: "Identity",     ot: "Psalm 2:8",           nt: "Revelation 2:27",     note: "Applied to Messiah receiving nations as inheritance in Ber. R. 44" },
  { id: 204, slug: "the-king-victory",                    title: "The King Victory",                cat: "Identity",     ot: "Psalm 21:1",          nt: "Matthew 28:18",       note: "Psalm 21 applied to the Messiah throughout by the Targum" },
  { id: 205, slug: "son-of-man-at-gods-right-hand",      title: "Son of Man at God Right Hand",    cat: "Identity",     ot: "Psalm 80:17",         nt: "Mark 14:62",          note: "Son of Man paraphrased by the Targum as King Messiah" },
  { id: 206, slug: "god-anointed-exalted",                title: "God Anointed Exalted",            cat: "Identity",     ot: "Psalm 89:22",         nt: "Matthew 28:18",       note: "Promise of God anointed applied to the Messiah in Yalkut on Isaiah 60" },
  { id: 207, slug: "desert-blooming",                     title: "Desert Blooming",                 cat: "Ministry",     ot: "Isaiah 35:1",         nt: "Matthew 11:5",        note: "Desert blossoming and healing applied to Messianic era in Yalkut and Talmud" },
  { id: 208, slug: "the-servant-exalted",                 title: "The Servant Exalted",             cat: "Passion",      ot: "Isaiah 52:13",        nt: "Philippians 2:9",     note: "Servant exalted and lifted up applied to the Messiah in Yalkut; introduces Suffering Servant" },
  { id: 209, slug: "david-raised-up",                     title: "David Raised Up",                 cat: "Resurrection", ot: "Jeremiah 30:9",       nt: "Luke 1:32",           note: "Serving the LORD and David raised up applied to Messianic era in Talmud" },
  { id: 210, slug: "the-tender-branch",                   title: "The Tender Branch",               cat: "Identity",     ot: "Ezekiel 17:22",       nt: "Matthew 13:32",       note: "Tender branch planted on a high mountain applied to the Messiah in the Targum on Ezekiel" },
  { id: 211, slug: "cleansing-and-new-spirit",            title: "Cleansing and New Spirit",        cat: "Resurrection", ot: "Ezekiel 36:25",       nt: "John 3:5",            note: "Cleansing with water and new spirit applied to spiritual renewal of Messianic era" },
  { id: 212, slug: "stone-cut-without-hands",             title: "Stone Cut Without Hands",         cat: "Resurrection", ot: "Daniel 2:34",         nt: "Matthew 21:44",       note: "Stone cut without hands destroying the statue applied to Messianic kingdom in Talmud" },
  { id: 213, slug: "the-breaker-goes-before",             title: "The Breaker Goes Before",         cat: "Identity",     ot: "Micah 2:13",          nt: "John 10:4",           note: "Breaker going before the flock applied to the Messiah in Ber. R. 48 and Bemid. R. 14" },
  { id: 214, slug: "spirit-resting-on-the-branch",        title: "Spirit Resting on the Branch",    cat: "Identity",     ot: "Isaiah 11:2",         nt: "Luke 3:22",           note: "Seven spirits of wisdom resting on Messiah extensively cited in Talmud, Targum, and Midrash" },
  { id: 215, slug: "branch-and-the-engraved-stone",       title: "Branch and the Engraved Stone",   cat: "Identity",     ot: "Zechariah 3:8",       nt: "Luke 1:78",           note: "My Servant the Branch plus stone with seven eyes applied to Messiah in Zechariah Targum" },
];

// Some Edersheim lessons also get McDowell dual-tags (Step 3)
const edersheimDualTags = {
  // Isa 11:2 → lesson 214
  214: { num: 20, title: "Special Anointing of Holy Spirit", note: "Targum Isaiah on Isa 11:1-4 cited verbatim; seven-fold Spirit at baptism" },
  // Isa 8:14 → lesson 142
  142: { num: 28, title: "Stone of Stumbling to Jews", note: "Targum Isaiah on 8:13-15 cited verbatim; Sanh. 38a Messianic application" },
};

// === NEW McDOWELL-ONLY COMING-SOON LESSONS ===
const mcdowellNewLessons = [
  { id: 221, slug: "son-of-isaac",              title: "Son of Isaac",              cat: "Identity",  ot: "Genesis 21:12",       nt: "Luke 3:34",       num: 5,  mcTitle: "Son of Isaac",                note: "God eliminates half of Abraham lineage — Ishmael excluded, Isaac chosen; narrows Messianic line" },
  { id: 222, slug: "prophet-like-moses-mc",      title: "Prophet Like Moses",        cat: "Ministry",  ot: "Deuteronomy 18:18",   nt: "John 6:14",       num: 16, mcTitle: "Shall Be a Prophet",           note: "Maimonides letter to Yemen: Messiah will be a very great Prophet; Kligerman on Jewish expectation; John 4:19 fulfillment" },
  { id: 223, slug: "judge-lawgiver-king",        title: "Judge, Lawgiver, King",     cat: "Ministry",  ot: "Isaiah 33:22",        nt: "John 5:30",       num: 18, mcTitle: "Judge",                        note: "LORD as Judge, Lawgiver, and King in one verse; Targum Isaiah cited; John 5:30 — righteous judgment" },
  { id: 224, slug: "king-on-holy-hill",          title: "King on Holy Hill",         cat: "Identity",  ot: "Psalm 2:6",           nt: "Matthew 27:37",   num: 19, mcTitle: "King",                         note: "Set as King on Zion; Jer 23:5 and Zech 9:9 cited as parallels; cross placard 'King of the Jews'" },
  { id: 225, slug: "fell-under-the-cross",       title: "Fell under the Cross",      cat: "Passion",   ot: "Psalm 109:24",        nt: "John 19:17",      num: 43, mcTitle: "Fell under the Cross",          note: "Knees weak from fasting, flesh feeble — physical collapse under weight of the cross on the way to Golgotha" },
  { id: 226, slug: "friends-stood-afar-off",     title: "Friends Stood Afar Off",    cat: "Passion",   ot: "Psalm 38:11",         nt: "Luke 23:49",      num: 49, mcTitle: "Friends Stood Afar Off",        note: "Loved ones and friends stand aloof from plague; Luke 23:49 — all acquaintances watched at a distance" },
  { id: 227, slug: "they-wagged-their-heads",    title: "They Wagged Their Heads",   cat: "Passion",   ot: "Psalm 109:25",        nt: "Matthew 27:39",   num: 50, mcTitle: "People Shook Their Heads",      note: "Ethridge: gesture implying no hope for the sufferer; Matt 27:39 — passersby wagging heads at the cross" },
  { id: 228, slug: "they-look-and-stare",        title: "They Look and Stare",       cat: "Passion",   ot: "Psalm 22:17",         nt: "Luke 23:35",      num: 51, mcTitle: "Stared Upon",                   note: "Can count all bones; they look and stare — crowd standing watching the crucifixion, Luke 23:35" },
  { id: 229, slug: "not-one-bone-broken",        title: "Not One Bone Broken",       cat: "Passion",   ot: "Psalm 34:20",         nt: "John 19:33",      num: 57, mcTitle: "Bones Not Broken",              note: "God guards all His bones; soldiers skipped breaking Jesus' legs because He was already dead — John 19:33" },
  { id: 230, slug: "heart-poured-out",           title: "Heart Poured Out",          cat: "Passion",   ot: "Psalm 22:14",         nt: "John 19:34",      num: 58, mcTitle: "Heartbroken",                   note: "Heart like wax melted within; blood and water from the pierced side are evidence the heart had literally burst" },
];

// Also need a new lesson for Gen 22:18 (dual Edersheim + McDowell)
const gen2218 = { id: 220, slug: "seed-of-abraham-edersheim", title: "Seed of Abraham", cat: "Identity", ot: "Genesis 22:18", nt: "Galatians 3:16",
  edNote: "Bemidbar R. 13 — universal blessing through Messiah",
  num: 4, mcTitle: "Seed of Abraham", mcNote: "Matthew Henry: 'in thy Seed one particular person' — Gal 3:16 singular seed argument"
};

// === GENERATE OUTPUT ===
let out = '';

// Part 1: Scholarship tags for existing 100 lessons
out += `\n\n// === SCHOLARSHIP ATTRIBUTION ===\n`;
out += `// Alfred Edersheim, The Life and Times of Jesus the Messiah (1883), Appendix IX\n`;
out += `// Josh McDowell, The New Evidence That Demands a Verdict (Thomas Nelson, 1999), Chapter 8\n\n`;

out += `const _scholarshipMap: Record<number, Scholarship> = {\n`;

const allIds = new Set([...Object.keys(edersheimTags).map(Number), ...Object.keys(mcdowellTags).map(Number)]);
const sortedIds = [...allIds].sort((a, b) => a - b);

for (const id of sortedIds) {
  const hasE = edersheimTags[id];
  const hasM = mcdowellTags[id];
  const parts = [];
  if (hasE) parts.push(`...edersheim(${JSON.stringify(hasE)})`);
  if (hasM) parts.push(`...mcdowell(${hasM.num}, ${JSON.stringify(hasM.title)}, ${JSON.stringify(hasM.note)})`);
  out += `  ${id}: { ${parts.join(', ')} },\n`;
}

out += `};\n\n`;
out += `for (const p of prophecies) {\n`;
out += `  const s = _scholarshipMap[p.id];\n`;
out += `  if (s) p.scholarship = s;\n`;
out += `}\n\n`;

// Part 2: New Edersheim coming-soon lessons
out += `// === NEW COMING-SOON LESSONS (Edersheim) ===\n\n`;

for (const l of edersheimNewLessons) {
  const dualMc = edersheimDualTags[l.id];
  let scholarshipArg;
  if (dualMc) {
    scholarshipArg = `{ ...edersheim(${JSON.stringify(l.note)}), ...mcdowell(${dualMc.num}, ${JSON.stringify(dualMc.title)}, ${JSON.stringify(dualMc.note)}) }`;
  } else {
    scholarshipArg = `{ ...edersheim(${JSON.stringify(l.note)}) }`;
  }
  out += `prophecies.push(makeLesson(${l.id}, ${JSON.stringify(l.slug)}, ${JSON.stringify(l.title)}, ${JSON.stringify(l.cat)},\n`;
  out += `  ${JSON.stringify(l.ot)}, ${JSON.stringify(l.nt)}, "", "", "", "coming-soon",\n`;
  out += `  ${scholarshipArg}));\n\n`;
}

// Part 3: Gen 22:18 dual-tagged lesson
out += `// Gen 22:18 — dual Edersheim + McDowell\n`;
out += `prophecies.push(makeLesson(${gen2218.id}, ${JSON.stringify(gen2218.slug)}, ${JSON.stringify(gen2218.title)}, ${JSON.stringify(gen2218.cat)},\n`;
out += `  ${JSON.stringify(gen2218.ot)}, ${JSON.stringify(gen2218.nt)}, "", "", "", "coming-soon",\n`;
out += `  { ...edersheim(${JSON.stringify(gen2218.edNote)}), ...mcdowell(${gen2218.num}, ${JSON.stringify(gen2218.mcTitle)}, ${JSON.stringify(gen2218.mcNote)}) }));\n\n`;

// Part 4: McDowell-only coming-soon lessons
out += `// === NEW COMING-SOON LESSONS (McDowell) ===\n\n`;

for (const l of mcdowellNewLessons) {
  out += `prophecies.push(makeLesson(${l.id}, ${JSON.stringify(l.slug)}, ${JSON.stringify(l.title)}, ${JSON.stringify(l.cat)},\n`;
  out += `  ${JSON.stringify(l.ot)}, ${JSON.stringify(l.nt)}, "", "", "", "coming-soon",\n`;
  out += `  { ...mcdowell(${l.num}, ${JSON.stringify(l.mcTitle)}, ${JSON.stringify(l.note)}) }));\n\n`;
}

fs.writeFileSync('/workspaces/scripture-journey/data/prophecies-appendix.ts', out);
console.log('Generated appendix with', sortedIds.length, 'scholarship tags,', edersheimNewLessons.length, 'Edersheim lessons,', mcdowellNewLessons.length, 'McDowell lessons, + 1 dual-tag');
