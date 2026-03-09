const fs = require('fs');
const path = require('path');

const content = {
  101: {
    ot: "This is the account of the heavens and the earth when they were created, when the LORD God made the earth and the heavens.",
    nt: "He who was seated on the throne said, \\\"I am making everything new!\\\" Then he said, \\\"Write this down, for these words are trustworthy and true.\\\"",
    why: "Genesis opens with God creating all things, and Revelation closes with God making all things new. Jesus is the thread that connects creation to restoration. What was broken by sin is fully renewed through Christ."
  },
  102: {
    ot: "Adam made love to his wife again, and she gave birth to a son and named him Seth, saying, \\\"God has granted me another child in place of Abel, since Cain killed him.\\\"",
    nt: "the son of Enosh, the son of Seth, the son of Adam, the son of God.",
    why: "After Cain murdered Abel, Eve received Seth — a replacement seed through whom the promise would continue. Luke traces Jesus all the way back through Seth to Adam and ultimately to God."
  },
  103: {
    ot: "May God extend Japheth's territory; may Japheth live in the tents of Shem, and may Canaan be the slave of Japheth.",
    nt: "But now in Christ Jesus you who once were far away have been brought near by the blood of Christ.",
    why: "Noah's prophecy that Japheth would dwell in Shem's tents foreshadowed Gentiles sharing in Israel's blessings. Paul declares that those once far away have been brought near through Christ's blood."
  },
  104: {
    ot: "He had a dream in which he saw a stairway resting on the earth, with its top reaching to heaven, and the angels of God were ascending and descending on it.",
    nt: "He then added, \\\"Very truly I tell you, you will see heaven open, and the angels of God ascending and descending on the Son of Man.\\\"",
    why: "Jacob saw a ladder connecting heaven and earth, and Jesus revealed that He is that ladder — the bridge between God and humanity, the one who opens heaven itself."
  },
  105: {
    ot: "Jacob looked up and there was Esau, coming with his four hundred men; so he divided the children among Leah, Rachel and the two female servants.",
    nt: "She gave birth to a son, a male child, who will rule all the nations with an iron scepter. And her child was snatched up to God and to his throne.",
    why: "Jacob faced Esau with vulnerability, yet God preserved his family and the messianic line. Revelation portrays a male child born to rule all nations, snatched to safety at God's throne."
  },
  106: {
    ot: "Then say to Pharaoh, \\\"This is what the LORD says: Israel is my firstborn son.\\\"",
    nt: "And so was fulfilled what the Lord had said through the prophet: \\\"Out of Egypt I called my son.\\\"",
    why: "God called Israel His firstborn son, and Matthew reveals that Jesus recapitulated Israel's journey — going to Egypt and being called out. Jesus is the true Israel, the faithful Son."
  },
  107: {
    ot: "He said to Aaron, \\\"Take a jar and put an omer of manna in it. Then place it before the LORD to be kept for the generations to come.\\\"",
    nt: "Whoever has ears, let them hear what the Spirit says to the churches. To the one who is victorious, I will give some of the hidden manna.",
    why: "The manna preserved in the ark pointed to Christ, the true bread from heaven. Jesus promises hidden manna to those who overcome — sustenance the world cannot see or take away."
  },
  108: {
    ot: "He said, \\\"Because hands were lifted up against the throne of the LORD, the LORD will be at war against the Amalekites from generation to generation.\\\"",
    nt: "I saw heaven standing open and there before me was a white horse, whose rider is called Faithful and True. With justice he judges and wages war.",
    why: "The ongoing war against Amalek pointed to a cosmic battle between God and evil. Revelation shows Christ on a white horse, faithful and true, bringing final justice."
  },
  109: {
    ot: "These are the laws you are to set before them.",
    nt: "Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfill them.",
    why: "The laws given through Moses pointed to Christ who would fulfill every requirement. Jesus did not discard the Law; He completed it perfectly in His life, death, and resurrection."
  },
  110: {
    ot: "I am the LORD your God, who brought you out of Egypt so that you would no longer be slaves to the Egyptians; I broke the bars of your yoke and enabled you to walk with heads held high.",
    nt: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free.",
    why: "God broke the yoke of slavery in Egypt, and Jesus announced He came to break every yoke — spiritual bondage, poverty, blindness, and oppression."
  },
  111: {
    ot: "On the first day, the one who brought his offering was Nahshon son of Amminadab of the tribe of Judah.",
    nt: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
    why: "The tribal offerings dedicated the tabernacle — God's dwelling with His people. Revelation shows the ultimate fulfillment: God dwelling with humanity forever, every tear wiped away."
  },
  112: {
    ot: "Moses said to the LORD, \\\"May the LORD, the God who gives breath to all living things, appoint someone over this community.\\\"",
    nt: "For the one whom God has sent speaks the words of God, for God gives the Spirit without limit.",
    why: "Moses asked God to raise a leader empowered by God's Spirit. Jesus is that leader, and unlike every prophet before Him, He received the Spirit without measure."
  },
  113: {
    ot: "See, the LORD your God has given you the land. Go up and take possession of it as the LORD, the God of your ancestors, told you. Do not be afraid; do not be discouraged.",
    nt: "Blessed are the meek, for they will inherit the earth.",
    why: "God promised Israel a land of inheritance, but Jesus expanded that promise — the meek will inherit the entire earth. The promised land was always a foretaste of something bigger."
  },
  114: {
    ot: "In majesty he is like a firstborn bull; his horns are the horns of a wild ox. With them he will gore the nations, even those at the ends of the earth.",
    nt: "Then one of the elders said to me, \\\"Do not weep! See, the Lion of the tribe of Judah, the Root of David, has triumphed.\\\"",
    why: "Moses blessed Joseph's descendants with imagery of unstoppable strength. Revelation reveals the ultimate firstborn: Christ, the Lion of Judah, who has triumphed over every power."
  },
  115: {
    ot: "So may all your enemies perish, LORD! But may all who love you be like the sun when it rises in its strength.",
    nt: "Then the righteous will shine like the sun in the kingdom of their Father. Whoever has ears, let them hear.",
    why: "Deborah's song compared the righteous to the rising sun. Jesus used the same image — His followers will shine like the sun in the Father's kingdom."
  },
  116: {
    ot: "This, then, is the family line of Perez: Perez was the father of Hezron.",
    nt: "Judah the father of Perez and Zerah, whose mother was Tamar, Perez the father of Hezron.",
    why: "Ruth's genealogy traces the line from Perez to David, and Matthew picks up exactly where Ruth left off — all the way to Jesus. The Savior's family tree is full of grace."
  },
  117: {
    ot: "He will give strength to his king and exalt the horn of his anointed.",
    nt: "He has raised up a horn of salvation for us in the house of his servant David.",
    why: "Hannah prophesied about a coming king whose power would be exalted by God. Zechariah declared that God had raised up that horn of salvation in the house of David."
  },
  118: {
    ot: "You save the humble, but your eyes are on the haughty to bring them low.",
    nt: "He has brought down rulers from their thrones but has lifted up the humble.",
    why: "David praised God for saving the humble and humbling the proud. Mary echoed the same theme — God brings down the powerful and lifts up the lowly."
  },
  119: {
    ot: "These are the last words of David: \\\"The inspired utterance of David son of Jesse, the utterance of the man exalted by the Most High.\\\"",
    nt: "He will be great and will be called the Son of the Most High. The Lord God will give him the throne of his father David.",
    why: "David's last words spoke of being exalted by the Most High. Gabriel told Mary her son would be called the Son of the Most High and receive David's throne."
  },
  120: {
    ot: "He said concerning the God of Israel, the Rock of Israel spoke to me: \\\"He who rules over people must be just, ruling in the fear of God.\\\"",
    nt: "Do not be amazed at this, for a time is coming when all who are in their graves will hear his voice and come out.",
    why: "David spoke of a coming righteous ruler appointed by God. Jesus declared He would exercise the ultimate act of righteous rule — calling the dead from their graves."
  },
  121: {
    ot: "You will break them with a rod of iron; you will dash them to pieces like pottery.",
    nt: "To the one who is victorious and does my will to the end, I will give authority over the nations — that one will rule them with an iron scepter.",
    why: "Psalm 2 describes the Messiah ruling the nations with an iron rod, shattering all opposition. Jesus promises to share this authority with those who overcome."
  },
  122: {
    ot: "LORD, you alone are my portion and my cup; you make my lot secure.",
    nt: "Going a little farther, he fell with his face to the ground and prayed, \\\"My Father, if it is possible, may this cup be taken from me. Yet not as I will, but as you will.\\\"",
    why: "David declared the LORD as his cup — the source of all blessing. In Gethsemane, Jesus faced the cup of God's wrath against sin. He drank it willingly so our cup could overflow with grace."
  },
  123: {
    ot: "For who is God besides the LORD? And who is the Rock except our God? It is God who arms me with strength and keeps my way secure.",
    nt: "Do not believe me unless I do the works of my Father. But if I do them, even though you do not believe me, believe the works.",
    why: "David proclaimed that God alone arms His servant with strength and validates His works. Jesus pointed to His own works as proof of His divine mission."
  },
  124: {
    ot: "He gives his king great victories; he shows unfailing love to his anointed, to David and to his descendants forever.",
    nt: "This is the genealogy of Jesus the Messiah the son of David, the son of Abraham.",
    why: "God promised unfailing love to His anointed and David's descendants forever. Matthew opens by identifying Jesus as the Messiah, son of David — the ultimate recipient of that promise."
  },
  125: {
    ot: "You have welcomed him with rich blessings and placed a crown of pure gold on his head.",
    nt: "On his head are many crowns. He has a name written on him that no one knows but he himself.",
    why: "The psalmist celebrated a king crowned with pure gold. Revelation reveals Christ wearing many crowns — sovereign over every kingdom, authority, and power."
  },
  126: {
    ot: "You are the most excellent of men and your lips have been anointed with grace, since God has forever blessed you.",
    nt: "But about the Son he says, \\\"Your throne, O God, will last for ever and ever; a scepter of justice will be the scepter of your kingdom.\\\"",
    why: "Psalm 45 praises the king as most excellent, anointed with grace. Hebrews applies this directly to Jesus — the Son whose throne is eternal and whose kingdom is ruled by justice."
  },
  127: {
    ot: "Gilead is mine, Manasseh is mine; Ephraim is my helmet, Judah is my scepter.",
    nt: "Then I heard the number of those who were sealed: 144,000 from all the tribes of Israel.",
    why: "God claimed every tribe of Israel as His own. Revelation shows the sealed remnant from all twelve tribes, united under the Lamb."
  },
  128: {
    ot: "Increase the days of the king's life, his years for many generations.",
    nt: "The kingdom of the world has become the kingdom of our Lord and of his Messiah, and he will reign for ever and ever.",
    why: "The psalmist prayed for the king's reign to last generations. In Christ, that prayer is answered beyond imagination — He reigns forever and ever."
  },
  129: {
    ot: "Endow the king with your justice, O God, the royal son with your righteousness.",
    nt: "He will reign over Jacob's descendants forever; his kingdom will never end.",
    why: "Psalm 72 prays for a king who rules with God's own justice — a reign enduring as long as the sun. Gabriel told Mary her son would reign over Jacob's descendants forever."
  },
  130: {
    ot: "Make us glad for as many days as you have afflicted us, for as many years as we have seen trouble.",
    nt: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away.",
    why: "Moses prayed that God would repay suffering with equal joy. Revelation promises the total elimination of sorrow. In Christ, every affliction is answered with eternal gladness."
  }
};

const filePath = path.join(__dirname, '..', 'data', 'prophecies.ts');
let file = fs.readFileSync(filePath, 'utf8');

let count = 0;
for (const [id, c] of Object.entries(content)) {
  const search = `makeLesson(${id},`;
  const idx = file.indexOf(search);
  if (idx === -1) { console.error(`MISS: ${id}`); continue; }
  
  const chunk = file.substring(idx, idx + 600);
  const emptyPattern = '"", "", "", "coming-soon"';
  const emptyIdx = chunk.indexOf(emptyPattern);
  if (emptyIdx === -1) { console.error(`NO PATTERN: ${id}`); continue; }
  
  const absIdx = idx + emptyIdx;
  const replacement = `"${c.ot}", "${c.nt}", "${c.why}"`;
  file = file.substring(0, absIdx) + replacement + file.substring(absIdx + emptyPattern.length);
  count++;
}

fs.writeFileSync(filePath, file, 'utf8');
console.log(`Batch 1 complete: ${count}/30 lessons filled`);
