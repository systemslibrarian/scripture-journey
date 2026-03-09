const fs = require('fs');
const path = require('path');

const content = {
  201: {
    ot: "Judah, your brothers will praise you; your hand will be on the neck of your enemies; your father's sons will bow down to you. You are a lion's cub, Judah.",
    nt: "Then one of the elders said to me, \\\"Do not weep! See, the Lion of the tribe of Judah, the Root of David, has triumphed. He is able to open the scroll and its seven seals.\\\"",
    why: "Jacob blessed Judah as a lion's cub whose brothers would bow before him. Revelation identifies Jesus as the Lion of the tribe of Judah — the one who has triumphed and alone is worthy to open God's sealed scroll."
  },
  202: {
    ot: "His eyes will be darker than wine, his teeth whiter than milk.",
    nt: "Jesus said to the servants, \\\"Fill the jars with water\\\"; so they filled them to the brim. Then he told them, \\\"Now draw some out and take it to the master of the banquet.\\\"",
    why: "Jacob's blessing depicted messianic abundance — eyes dark with wine, teeth white with milk. Jesus' first miracle was turning water into the finest wine at Cana, a sign of the overflowing abundance the Messiah brings."
  },
  203: {
    ot: "Ask me, and I will make the nations your inheritance, the ends of the earth your possession.",
    nt: "To the one who is victorious and does my will to the end, I will give authority over the nations.",
    why: "The Father promised His Son the nations as inheritance. Revelation confirms that Christ shares this authority with those who overcome. The ends of the earth belong to Him, and He gives His followers a share in His reign."
  },
  204: {
    ot: "The king rejoices in your strength, LORD. How great is his joy in the victories you give!",
    nt: "Then Jesus came to them and said, \\\"All authority in heaven and on earth has been given to me.\\\"",
    why: "The psalmist celebrated a king rejoicing in God-given victories. Jesus declared that all authority — in heaven and on earth — has been given to Him. The ultimate royal victory is Christ's."
  },
  205: {
    ot: "Let your hand rest on the man at your right hand, the son of man you have raised up for yourself.",
    nt: "And you will see the Son of Man sitting at the right hand of the Mighty One and coming on the clouds of heaven.",
    why: "The psalmist prayed for God's hand to rest on the son of man at His right hand. Jesus declared that He is that Son of Man — seated at the right hand of the Mighty One, coming on heaven's clouds."
  },
  206: {
    ot: "No enemy will subject him to tribute; no wicked man will oppress him. I will crush his foes before him and strike down his adversaries.",
    nt: "Then Jesus came to them and said, \\\"All authority in heaven and on earth has been given to me.\\\"",
    why: "God promised in Psalm 89 that no enemy would prevail against His anointed. Jesus received all authority in heaven and earth — every foe is crushed, every adversary struck down by God's exalted King."
  },
  207: {
    ot: "The desert and the parched land will be glad; the wilderness will rejoice and blossom. Like the crocus, it will burst into bloom.",
    nt: "Go back and report to John what you hear and see: The blind receive sight, the lame walk, those who have leprosy are cleansed, the deaf hear, the dead are raised.",
    why: "Isaiah prophesied the desert blooming and the weak being strengthened. Jesus pointed to His miracles as evidence — the blind see, the lame walk, the deaf hear. Isaiah's desert has burst into bloom through Christ's ministry."
  },
  208: {
    ot: "See, my servant will act wisely; he will be raised and lifted up and highly exalted.",
    nt: "Therefore God exalted him to the highest place and gave him the name that is above every name.",
    why: "Isaiah foretold a servant who would be highly exalted. Paul declares that God has done exactly this — exalting Christ to the highest place with the name above every name. The suffering servant is the exalted Lord."
  },
  209: {
    ot: "They will serve the LORD their God and David their king, whom I will raise up for them.",
    nt: "He will be great and will be called the Son of the Most High. The Lord God will give him the throne of his father David.",
    why: "Jeremiah prophesied that God would raise up David their king. Gabriel announced Jesus as the Son of the Most High who receives David's throne. Christ is the David whom God raises up for His people."
  },
  210: {
    ot: "This is what the Sovereign LORD says: I myself will take a shoot from the very top of a cedar and plant it; I will break off a tender sprig from its topmost shoots and plant it on a high and lofty mountain.",
    nt: "He told them another parable: \\\"The kingdom of heaven is like a mustard seed, which a man took and planted in his field. Though it is the smallest of all seeds, yet when it grows, it is the largest of garden plants.\\\"",
    why: "Ezekiel described God planting a tender branch that grows into a great tree. Jesus used the same image — the kingdom starts small like a mustard seed and grows to shelter all. God's kingdom begins humbly but becomes immense."
  },
  211: {
    ot: "I will sprinkle clean water on you, and you will be clean; I will cleanse you from all your impurities and from all your idols. I will give you a new heart and put a new spirit in you.",
    nt: "Jesus answered, \\\"Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit.\\\"",
    why: "Ezekiel prophesied cleansing with water and a new spirit. Jesus told Nicodemus that entering God's kingdom requires being born of water and the Spirit — Ezekiel's prophecy describes the new birth Christ makes possible."
  },
  212: {
    ot: "While you were watching, a rock was cut out, but not by human hands. It struck the statue on its feet of iron and clay and smashed them.",
    nt: "Anyone who falls on this stone will be broken to pieces; anyone on whom it falls will be crushed.",
    why: "Daniel saw a stone cut without human hands that destroyed every earthly kingdom. Jesus applied this to Himself — He is the stone that breaks and crushes. God's kingdom replaces every human empire."
  },
  213: {
    ot: "The One who breaks open the way will go up before them; they will break through the gate and go out. Their King will pass through before them, the LORD at their head.",
    nt: "The one who enters by the gate is the shepherd of the sheep. The gatekeeper opens the gate for him, and the sheep listen to his voice.",
    why: "Micah prophesied a Breaker who goes before His people, opening the way. Jesus declared Himself the shepherd who enters by the gate, leading His sheep out. He is the one who breaks through every barrier for His flock."
  },
  214: {
    ot: "The Spirit of the LORD will rest on him — the Spirit of wisdom and of understanding, the Spirit of counsel and of might, the Spirit of the knowledge and fear of the LORD.",
    nt: "And the Holy Spirit descended on him in bodily form like a dove. And a voice came from heaven: \\\"You are my Son, whom I love; with you I am well pleased.\\\"",
    why: "Isaiah described the Spirit resting on the Branch in fullness — wisdom, understanding, counsel, might. At Jesus' baptism, the Spirit descended visibly, and the Father confirmed: this is My beloved Son. Isaiah's sevenfold Spirit rests on Christ."
  },
  215: {
    ot: "Listen, High Priest Joshua, you and your associates seated before you, who are men symbolic of things to come: I am going to bring my servant, the Branch. See, the stone I have set in front of Joshua!",
    nt: "because of the tender mercy of our God, by which the rising sun will come to us from heaven.",
    why: "Zechariah presented the Branch and the stone — twin images of the coming Messiah. Luke connects this to Christ as the rising sun from heaven, dawning on those in darkness. The Branch Zechariah foresaw is the sunrise of salvation."
  },
  220: {
    ot: "and through your offspring all nations on earth will be blessed, because you have obeyed me.",
    nt: "The promises were spoken to Abraham and to his seed. Scripture does not say \\\"and to seeds,\\\" meaning many people, but \\\"and to your seed,\\\" meaning one person, who is Christ.",
    why: "God promised Abraham that all nations would be blessed through his seed. Paul identifies this seed as Christ — the singular offspring through whom every nation receives blessing. The Abrahamic covenant finds its fulfillment in Jesus."
  },
  221: {
    ot: "Through Isaac that your offspring will be reckoned.",
    nt: "the son of Jacob, the son of Isaac, the son of Abraham, the son of Terah.",
    why: "God specified that the promised line would flow through Isaac, not Ishmael. Luke's genealogy confirms Jesus descends through Isaac — the child of promise. God's covenant faithfulness is traced through every generation."
  },
  222: {
    ot: "I will raise up for them a prophet like you from among their fellow Israelites, and I will put my words in his mouth. He will tell them everything I command him.",
    nt: "After the people saw the sign Jesus performed, they began to say, \\\"Surely this is the Prophet who is to come into the world.\\\"",
    why: "Moses prophesied a future prophet like himself whom God would raise from among the people. After Jesus multiplied bread, the crowds recognized Him as that Prophet. Christ fulfills Moses' prediction as the ultimate mediator between God and His people."
  },
  223: {
    ot: "For the LORD is our judge, the LORD is our lawgiver, the LORD is our king; it is he who will save us.",
    nt: "By myself I can do nothing; I judge only as I hear, and my judgment is just, for I seek not to please myself but him who sent me.",
    why: "Isaiah declared God as judge, lawgiver, and king — the one who saves. Jesus exercises all three roles — judging justly, fulfilling the law, and reigning as king — yet always in submission to the Father."
  },
  224: {
    ot: "I have installed my king on Zion, my holy mountain.",
    nt: "Above his head they placed the written charge against him: THIS IS JESUS, THE KING OF THE JEWS.",
    why: "God declared in Psalm 2 that He installed His king on Zion. At Calvary, the sign above Jesus read \\\"King of the Jews\\\" — what Pilate meant as mockery, God meant as coronation. The cross was His throne."
  },
  225: {
    ot: "My knees give way from fasting; my body is thin and gaunt.",
    nt: "Carrying his own cross, he went out to the place of the Skull (which in Aramaic is called Golgotha).",
    why: "The psalmist described physical collapse under suffering — weakened knees, a wasted body. Jesus carried His own cross to Golgotha, His body broken by scourging and exhaustion. The psalmist's agony prefigured Christ's."
  },
  226: {
    ot: "My friends and companions avoid me because of my wounds; my neighbors stay far away.",
    nt: "But all those who knew him, including the women who had followed him from Galilee, stood at a distance, watching these things.",
    why: "The psalmist lamented that friends and companions withdrew because of his suffering. At the cross, those who knew Jesus stood at a distance, watching. The isolation of suffering was part of the Messiah's cost."
  },
  227: {
    ot: "Those who see me shake their heads.",
    nt: "Those who passed by hurled insults at him, shaking their heads.",
    why: "The psalmist described onlookers shaking their heads in contempt. Matthew records the same scene at Calvary — passersby hurled insults and shook their heads at Jesus. The psalm was a script, and the cross was its stage."
  },
  228: {
    ot: "I can count all my bones; people stare and gloat over me.",
    nt: "The people stood watching, and the rulers even sneered at him. They said, \\\"He saved others; let him save himself if he is God's Messiah, the Chosen One.\\\"",
    why: "The psalmist described being stared at and gloated over. Luke records the crowd watching and sneering at Jesus on the cross. Every detail of Psalm 22 was lived out in Christ's crucifixion."
  },
  229: {
    ot: "He protects all his bones, not one of them will be broken.",
    nt: "But when they came to Jesus and found that he was already dead, they did not break his legs.",
    why: "The psalmist declared that God protects His righteous one — not a bone will be broken. At the cross, the soldiers broke the legs of the two criminals but found Jesus already dead. God protected His Son's bones, fulfilling the psalm."
  },
  230: {
    ot: "All my bones are out of joint. My heart has turned to wax; it has melted within me.",
    nt: "Instead, one of the soldiers pierced Jesus' side with a spear, bringing a sudden flow of blood and water.",
    why: "The psalmist described a heart melted like wax within him. When the soldier pierced Jesus' side, blood and water flowed — medical evidence of a heart that literally burst. Psalm 22 described the Messiah's death a thousand years before the cross."
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
console.log(`Batch 4 complete: ${count}/26 lessons filled`);
