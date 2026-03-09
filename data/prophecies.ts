import type { Lesson } from "@/lib/types"

function makeLesson(
  id:number,
  slug:string,
  title:string,
  category:Lesson["category"],
  otReference:string,
  ntReference:string,
  otText:string,
  ntText:string
):Lesson{

return{
id,
slug,
title,
category,
otReference,
otText,
ntReference,
ntText,
summary:`This lesson explores how ${otReference} connects to Jesus.`,
whyItMatters:`Christians understand this passage as pointing forward to Jesus and His mission.`,
reflection:`Lord Jesus, help me see You more clearly through Your Word.`,
quiz:{
question:"Which Old Testament reference connects to this lesson?",
choices:[otReference,"Isaiah 53","Psalm 22","Genesis 3:15"],
answer:0
}
}

}

export const prophecies:Lesson[]=[

makeLesson(1,"seed-of-the-woman","Seed of the Woman","Identity","Genesis 3:15","1 John 3:8"),
makeLesson(2,"blessing-through-abraham","Blessing Through Abraham","Identity","Genesis 12:3","Galatians 3:16"),
makeLesson(3,"tribe-of-judah","From the Tribe of Judah","Identity","Genesis 49:10","Hebrews 7:14"),
makeLesson(4,"prophet-like-moses","Prophet Like Moses","Ministry","Deuteronomy 18:15","Acts 3:22"),
makeLesson(5,"passover-lamb","The Passover Lamb","Passion","Exodus 12:46","John 19:36"),
makeLesson(6,"son-of-david","Son of David","Identity","2 Samuel 7:12","Luke 1:32"),
makeLesson(7,"virgin-birth","Born of a Virgin","Identity","Isaiah 7:14","Matthew 1:23"),
makeLesson(8,"light-in-galilee","Light in Galilee","Ministry","Isaiah 9:1","Matthew 4:16"),
makeLesson(9,"messenger-before-messiah","Messenger Before Messiah","Ministry","Malachi 3:1","Mark 1:2"),
makeLesson(10,"born-in-bethlehem","Born in Bethlehem","Identity","Micah 5:2","Matthew 2:1"),

makeLesson(11,"king-priest","King Priest","Identity","Psalm 110:4","Hebrews 5:6"),
makeLesson(12,"son-of-god","Declared Son of God","Identity","Psalm 2:7","Matthew 3:17"),
makeLesson(13,"betrayed-by-friend","Betrayed by Friend","Rejection","Psalm 41:9","John 13:18"),
makeLesson(14,"thirty-pieces","Thirty Pieces of Silver","Rejection","Zechariah 11:12","Matthew 26:15"),
makeLesson(15,"money-thrown-temple","Money Thrown in Temple","Rejection","Zechariah 11:13","Matthew 27:5"),
makeLesson(16,"hands-feet-pierced","Hands and Feet Pierced","Passion","Psalm 22:16","John 20:25"),
makeLesson(17,"soldiers-cast-lots","Garments Cast Lots","Passion","Psalm 22:18","John 19:24"),
makeLesson(18,"mocked-on-cross","Mocked While Suffering","Passion","Psalm 22:7","Matthew 27:39"),
makeLesson(19,"given-vinegar","Given Vinegar","Passion","Psalm 69:21","Matthew 27:34"),
makeLesson(20,"bones-not-broken","Bones Not Broken","Passion","Exodus 12:46","John 19:36"),

makeLesson(21,"pierced-side","Pierced Side","Passion","Zechariah 12:10","John 19:34"),
makeLesson(22,"silent-before-accusers","Silent Before Accusers","Passion","Isaiah 53:7","Matthew 27:12"),
makeLesson(23,"suffering-servant","Suffering Servant","Passion","Isaiah 53:5","1 Peter 2:24"),
makeLesson(24,"buried-with-rich","Buried with Rich","Passion","Isaiah 53:9","Matthew 27:57"),
makeLesson(25,"resurrection-psalm","Resurrection Foretold","Resurrection","Psalm 16:10","Acts 2:31"),
makeLesson(26,"ascension","Ascension","Resurrection","Psalm 68:18","Ephesians 4:8"),
makeLesson(27,"right-hand-of-god","Seated at God's Right Hand","Resurrection","Psalm 110:1","Acts 2:34"),
makeLesson(28,"light-to-nations","Light to the Nations","Ministry","Isaiah 42:6","Luke 2:32"),
makeLesson(29,"healing-ministry","Healing Ministry","Ministry","Isaiah 35:5","Matthew 11:5"),
makeLesson(30,"teach-in-parables","Teaching in Parables","Ministry","Psalm 78:2","Matthew 13:34"),

makeLesson(31,"zeal-for-temple","Zeal for God's House","Ministry","Psalm 69:9","John 2:17"),
makeLesson(32,"rejected-stone","Rejected Stone","Rejection","Psalm 118:22","Acts 4:11"),
makeLesson(33,"humble-king","Humble King","Identity","Zechariah 9:9","Matthew 21:5"),
makeLesson(34,"shepherd-struck","Shepherd Struck","Passion","Zechariah 13:7","Matthew 26:31"),
makeLesson(35,"son-called-out-of-egypt","Called Out of Egypt","Identity","Hosea 11:1","Matthew 2:15"),
makeLesson(36,"righteous-branch","Righteous Branch","Identity","Jeremiah 23:5","Luke 1:32"),
makeLesson(37,"everlasting-kingdom","Everlasting Kingdom","Identity","Daniel 7:14","Luke 1:33"),
makeLesson(38,"anointed-one","The Anointed One","Identity","Daniel 9:25","John 1:41"),
makeLesson(39,"cut-off-messiah","Messiah Cut Off","Passion","Daniel 9:26","Mark 15:37"),
makeLesson(40,"good-shepherd","The Good Shepherd","Ministry","Ezekiel 34:23","John 10:11"),

makeLesson(41,"stone-builders-rejected","Stone Rejected","Rejection","Psalm 118:22","Matthew 21:42"),
makeLesson(42,"despised-rejected","Despised and Rejected","Rejection","Isaiah 53:3","John 1:11"),
makeLesson(43,"crucified-with-sinners","Crucified with Sinners","Passion","Isaiah 53:12","Mark 15:28"),
makeLesson(44,"intercedes-for-transgressors","Intercedes for Sinners","Resurrection","Isaiah 53:12","Romans 8:34"),
makeLesson(45,"resurrection-victory","Victory Over Death","Resurrection","Isaiah 25:8","1 Corinthians 15:54"),
makeLesson(46,"king-of-kings","King of Kings","Resurrection","Daniel 7:27","Revelation 19:16"),
makeLesson(47,"cornerstone","Cornerstone","Identity","Isaiah 28:16","1 Peter 2:6"),
makeLesson(48,"messiah-prince","Messiah the Prince","Identity","Daniel 9:25","John 12:13"),
makeLesson(49,"shepherd-king","Shepherd King","Identity","Micah 5:4","John 10:11"),
makeLesson(50,"everlasting-light","Everlasting Light","Resurrection","Isaiah 60:19","Revelation 21:23"),

makeLesson(51,"righteous-servant","Righteous Servant","Passion","Isaiah 53:11","Romans 5:19"),
makeLesson(52,"deliverer-from-zion","Deliverer from Zion","Resurrection","Isaiah 59:20","Romans 11:26"),
makeLesson(53,"child-born","Child is Born","Identity","Isaiah 9:6","Luke 2:11"),
makeLesson(54,"mighty-god","Mighty God","Identity","Isaiah 9:6","John 1:1"),
makeLesson(55,"eternal-father","Everlasting Father","Identity","Isaiah 9:6","John 14:9"),
makeLesson(56,"prince-of-peace","Prince of Peace","Identity","Isaiah 9:6","Ephesians 2:14"),
makeLesson(57,"government-on-shoulders","Government on His Shoulders","Identity","Isaiah 9:6","Revelation 11:15"),
makeLesson(58,"throne-established","Throne Established Forever","Identity","Isaiah 9:7","Luke 1:33"),
makeLesson(59,"servant-brings-justice","Servant Brings Justice","Ministry","Isaiah 42:1","Matthew 12:18"),
makeLesson(60,"gentle-servant","Gentle Servant","Ministry","Isaiah 42:2","Matthew 12:19"),

makeLesson(61,"open-blind-eyes","Open Blind Eyes","Ministry","Isaiah 42:7","John 9:25"),
makeLesson(62,"good-news-poor","Good News to the Poor","Ministry","Isaiah 61:1","Luke 4:18"),
makeLesson(63,"year-of-the-lord","Year of the Lord's Favor","Ministry","Isaiah 61:2","Luke 4:19"),
makeLesson(64,"redeemer","Redeemer Comes","Resurrection","Isaiah 59:20","Romans 11:26"),
makeLesson(65,"stone-in-zion","Stone in Zion","Identity","Isaiah 28:16","Romans 9:33"),
makeLesson(66,"new-covenant","New Covenant","Resurrection","Jeremiah 31:31","Luke 22:20"),
makeLesson(67,"lord-our-righteousness","The Lord Our Righteousness","Identity","Jeremiah 23:6","1 Corinthians 1:30"),
makeLesson(68,"good-shepherd-king","Shepherd King","Identity","Ezekiel 37:24","John 10:11"),
makeLesson(69,"son-of-man","Son of Man","Identity","Daniel 7:13","Matthew 26:64"),
makeLesson(70,"everlasting-dominion","Everlasting Dominion","Resurrection","Daniel 7:14","Revelation 11:15"),

makeLesson(71,"ruler-from-bethlehem","Ruler from Bethlehem","Identity","Micah 5:2","Matthew 2:6"),
makeLesson(72,"shepherd-of-israel","Shepherd of Israel","Identity","Micah 5:4","John 10:11"),
makeLesson(73,"enter-jerusalem","King Enters Jerusalem","Ministry","Zechariah 9:9","Matthew 21:5"),
makeLesson(74,"shepherd-rejected","Rejected Shepherd","Rejection","Zechariah 11:10","John 1:11"),
makeLesson(75,"price-of-shepherd","Price of Shepherd","Rejection","Zechariah 11:12","Matthew 26:15"),
makeLesson(76,"thirty-silver","Thirty Pieces","Rejection","Zechariah 11:13","Matthew 27:9"),
makeLesson(77,"pierced-one","The Pierced One","Passion","Zechariah 12:10","John 19:37"),
makeLesson(78,"shepherd-struck2","Strike the Shepherd","Passion","Zechariah 13:7","Matthew 26:31"),
makeLesson(79,"sun-darkened","Darkness at Noon","Passion","Amos 8:9","Luke 23:44"),
makeLesson(80,"messenger-temple","Messenger Comes","Ministry","Malachi 3:1","Mark 1:2"),

makeLesson(81,"lord-comes-temple","Lord Comes to Temple","Ministry","Malachi 3:1","Luke 2:27"),
makeLesson(82,"sun-of-righteousness","Sun of Righteousness","Resurrection","Malachi 4:2","Luke 1:78"),
makeLesson(83,"resurrection-day","Resurrection Victory","Resurrection","Psalm 16:10","Acts 2:31"),
makeLesson(84,"ascended-lord","Ascended Lord","Resurrection","Psalm 68:18","Ephesians 4:8"),
makeLesson(85,"king-at-gods-right","King at God's Right","Resurrection","Psalm 110:1","Hebrews 1:3"),
makeLesson(86,"eternal-priest","Eternal Priest","Identity","Psalm 110:4","Hebrews 7:17"),
makeLesson(87,"suffering-psalm","Suffering Psalm","Passion","Psalm 22","Matthew 27"),
makeLesson(88,"mocked-king","Mocked King","Passion","Psalm 22:7","Matthew 27:39"),
makeLesson(89,"pierced-hands","Pierced Hands","Passion","Psalm 22:16","John 20:25"),
makeLesson(90,"divided-garments","Divided Garments","Passion","Psalm 22:18","John 19:24"),

makeLesson(91,"vinegar-drink","Vinegar Drink","Passion","Psalm 69:21","John 19:29"),
makeLesson(92,"zeal-house","Zeal for House","Ministry","Psalm 69:9","John 2:17"),
makeLesson(93,"stone-rejected2","Rejected Stone","Rejection","Psalm 118:22","Acts 4:11"),
makeLesson(94,"kingdom-forever","Kingdom Forever","Resurrection","Daniel 7:27","Revelation 11:15"),
makeLesson(95,"servant-justifies","Servant Justifies Many","Resurrection","Isaiah 53:11","Romans 5:19"),
makeLesson(96,"buried-rich","Buried With Rich","Passion","Isaiah 53:9","Matthew 27:57"),
makeLesson(97,"silent-lamb","Silent Lamb","Passion","Isaiah 53:7","Matthew 27:12"),
makeLesson(98,"pierced-for-sins","Pierced for Sins","Passion","Isaiah 53:5","1 Peter 2:24"),
makeLesson(99,"resurrection-glory","Resurrection Glory","Resurrection","Isaiah 25:8","1 Corinthians 15:54"),
makeLesson(100,"eternal-king","Eternal King","Resurrection","Daniel 7:14","Revelation 19:16")

]

export const firstTenLessons = prophecies.slice(0,10)