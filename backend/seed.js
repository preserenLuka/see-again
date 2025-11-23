// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Class } from "./models/Class.js";
import { Lecture } from "./models/Lecture.js";
import { User } from "./models/User.js"; // adjust path if needed
import bcrypt from "bcrypt";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 1) Find any existing user
    await Promise.all([
      User.deleteMany({}),
      Class.deleteMany({}),
      Lecture.deleteMany({})
    ]);

    const beforeHashedPasword = "pupil12345"
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(beforeHashedPasword, saltRounds);

    const user = await User.create({
      email: "nikkatleban@gmail.com",
      firstName: "Nik",
      lastName: "Leban",
      password: hashedPassword,
    })

    console.log(`👤 Using user ${user.email} (${user._id}) for seeding.`);

    // 2) Clear ALL classes & lectures
    await Promise.all([
      Class.deleteMany({}),
      Lecture.deleteMany({})
    ]);

    console.log("🧹 Cleared all Class & Lecture data");

    // 3) Create high school classes for this user
    const classes = await Class.insertMany([
      {
        name: "Matematika",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Slovenščina",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Fizika",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Geografija",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Računalništvo",
        studyYear: "2. letnik",
        user: user._id,
      },
      {
        name: "Zgodovina",
        studyYear: "2. letnik",
        user: user._id,
      }
    ]);

    console.log(`🌱 Inserted ${classes.length} classes`);

    // 4) Create lectures linked to those classes
    await Lecture.insertMany([
    // MATEMATIKA
    {
      title: "Kvadratne funkcije",
      class: classes[0]._id,
      description: "Osnovne značilnosti kvadratnih funkcij in njihovih grafov.",
      date: new Date("2024-07-15"),
      content: "Kvadratna funkcija je ena temeljnih matematičnih funkcij, ki jo prepoznamo po parabolični obliki grafa. V vsebini obravnavamo splošno obliko funkcije f(x) = ax² + bx + c ter raziskujemo, kako posamezni koeficienti vplivajo na lokacijo, širino in usmerjenost parabole. Podrobneje razložimo postopek iskanja ničel s pomočjo diskriminante in poudarimo, zakaj število ničel pove veliko o obnašanju funkcije. Poseben poudarek namenimo tudi izračunu temena, ki predstavlja najvišjo ali najnižjo točko grafa, ter njegovemu pomena pri branju realnih problemov. Skozi preproste primere prikažemo, kako lahko kvadratne funkcije uporabimo pri modeliranju gibanja, optimizacij in naravnih pojavov.",
      topics: ["kvadratna funkcija", "graf", "ničle"]
    },
    {
      title: "Zaporedja in limite",
      class: classes[0]._id,
      description: "Intuitiven uvod v zaporedja in obnašanje njihovih vrednosti.",
      date: new Date("2024-08-22"),
      content: "Zaporedja predstavljajo pomemben matematični koncept, ki opisuje urejene vrste števil, pri katerih nas zanima dolgoročno obnašanje njihovih členov. V tej vsebini razložimo, kaj zaporedje sploh je, kako ga lahko predstavimo s predpisom ali tabelarično, ter kakšne vrste zaporedij poznamo. Preučimo monotona zaporedja, ki naraščajo ali padajo, ter razložimo, kako omejenost vpliva na možnost, da zaporedje konvergira. S konkretnimi primeri pokažemo, kako člani zaporedja lahko približujejo določenemu številu, ki ga imenujemo limita. Učenci se naučijo intuitivno razumeti pojem približevanja brez strogih dokazov, skozi grafične prikaze pa vidijo, kako se spreminjajo vrednosti posameznih členov. Dotaknemo se tudi vsakdanjih primerov, npr. modeliranja obrestovanja ali fizikalnih procesov.",
      topics: ["zaporedja", "limite"]
    },
    {
      title: "Linearne funkcije",
      class: classes[0]._id,
      description: "Ponovitev linearnih funkcij in pomen smernega koeficienta.",
      date: new Date("2024-10-01"),
      content: "Linearne funkcije so ena najpreprostejših, a izredno uporabnih matematičnih orodij. Predstavimo splošno obliko f(x) = kx + n ter podrobno razložimo pomen smernega koeficienta, ki določa nagib premice, in začetne vrednosti, ki določa, kje premica seka os y. Skozi grafe pokažemo, kako sprememba koeficientov vpliva na položaj in naklon premice. Učenci se naučijo brati grafe, prepoznavati linearna razmerja v realnem življenju (npr. enakomerna gibanja, stroški, razdalje) ter reševati naloge, kjer je treba iz podatkov določiti predpis funkcije. Obravnava vključuje primere iz vsakdana, risanje grafov, reševanje nalog ter interpretacijo rezultatov.",
      topics: ["linearne funkcije", "graf", "algebra"]
    },
    {
      title: "Sistemi enačb",
      class: classes[0]._id,
      description: "Metode reševanja sistemov dveh enačb z dvema neznankama.",
      date: new Date("2024-10-15"),
      content: "Sistemi dveh enačb z dvema neznankama predstavljajo pomembno orodje pri reševanju matematičnih in praktičnih problemov. V tej vsebini podrobno obdelamo tri ključne metode: grafično, substitucijsko in eliminacijsko. Pojasnimo prednosti in slabosti vsake metode ter pokažemo, v katerih situacijah je posamezna metoda bolj učinkovita. Učenci se naučijo poiskati presečišče dveh premic ter interpretirati rešitev sistema. Poseben poudarek namenimo realnim primerom, kot so iskanje cen, količin, razmerij in časov. Poleg običajnih primerov obravnavamo tudi sisteme brez rešitev in sisteme z neskončno mnogo rešitvami ter razložimo, kako jih prepoznamo.",
      topics: ["sistemi enačb", "algebra"]
    },

    // SLOVENŠČINA
    {
      title: "Lirska pesem modernizem",
      class: classes[1]._id,
      description: "Značilnosti in razvoj lirske pesmi v modernizmu.",
      date: new Date("2024-10-01"),
      content: "V modernizmu se lirska pesem močno razvije in oddalji od tradicionalnih oblik ter tematik. Učenci spoznajo zgodovinsko ozadje nastanka modernizma, vpliv družbenih sprememb in iskanja novih načinov izražanja. Vsebina podrobno razloži značilnosti modernistične lirike: poglobljeno izpoved subjektivnih občutij, simboliko, svobodni verz, poudarek na notranjih stanjih ter prelom z klasičnimi oblikami. Analiziramo izbrane pesmi slovenskih in tujih modernistov, spoznamo pogoste motive, kot so osamljenost, tesnoba, dvom, odnos do sveta in iskanje identitete. Učenci se naučijo interpretirati pesem, prepoznavati stilne prvine in iz besedila izluščiti bistvene pomene.",
      topics: ["lirika", "modernizem"]
    },
    {
      title: "pripovedni elementi",
      class: classes[1]._id,
      description: "Pregled ključnih prvin epskega besedila.",
      date: new Date("2024-11-10"),
      content: "Epika predstavlja obsežen sklop pripovednih besedil, ki vključuje romane, novele, povesti in druge oblike. V tej vsebini preučimo ključne gradnike pripovedi: pripovedovalca, fabulo, like, čas in prostor. Razložimo razlike med prvoosebnim in vsevednim pripovedovalcem ter kako izbira pripovedne perspektive vpliva na doživljanje zgodbe. Učenci analizirajo gradnjo fabule, odnos med dogodki, razvoj likov ter simboliko prostora. Skozi primere iz znane literature pokažemo, kako prepoznati motive, osrednje teme in sporočilnost besedila. Učenci vadijo opisovanje literarnih likov, povzemanje zgodbe in interpretacijo pripovednih besedil.",
      topics: ["epika", "pripovedništvo"]
    },
    {
      title: "sklanjatev samostalnikov",
      class: classes[1]._id,
      description: "Pregled sklanjatvenih vzorcev v slovenščini.",
      date: new Date("2024-12-18"),
      content: "Sklanjanje samostalnikov je eno ključnih področij slovenske slovnice, zato se v tej vsebini osredotočimo na prepoznavanje sklanjatvenih vzorcev ter natančno rabo oblik v različnih sklonih. Razložimo razlike med moškim, ženskim in srednjim spolom, tipične končnice in pogoste izjeme. Učenci skozi primere vadijo tvorjenje pravilnih oblik v pisnih in govornih vajah. Poseben poudarek namenimo sklanjanju samostalnikov v množini, sklanjanju tujk ter najpogostejšim napakam, ki se pojavljajo v vsakdanji rabi. Cilj je doseči natančno, pravilno in samozavestno rabo jezika.",
      topics: ["slovenščina", "slovnica"]
    },

    // FIZIKA
    {
      title: "Newtonovi zakoni",
      class: classes[2]._id,
      description: "Pregled osnov mehanike in treh Newtonovih zakonov.",
      date: new Date("2024-10-05"),
      content: "Newtonovi zakoni so temelj razumevanja mehanike. V tej učni uri ponovimo prvi, drugi in tretji zakon ter njihov pomen pri opisovanju gibanja. Skozi primere prikažemo, kako sila vpliva na pospešek, zakaj telo ostane v miru ali gibanju, če nanj ne deluje zunanja sila, ter kako sile medsebojno delujejo. Raziskujemo vsakdanje primere, kot so gibanje avtomobila, potiskanje škatle ali padanje predmetov. Učenci se naučijo izračunati osnovne veličine, kot so sila, masa in pospešek, ter modelirati preproste situacije. Poudarek je na razumevanju, ne le na formulah.",
      topics: ["mehanika", "Newtonovi zakoni"]
    },
    {
      title: "Delo in energija",
      class: classes[2]._id,
      description: "Osnovni pojmi energije in dela.",
      date: new Date("2024-10-15"),
      content: "Tema zajema temeljne pojme energije, dela in povezavo med njima. Razložimo, kako delo nastane kot produkt sile in premika ter kako se energija prenaša med telesi. Obravnavamo različne vrste energije: kinetično, potencialno, toplotno in mehansko. Poseben poudarek namenimo zakonu o ohranitvi energije ter praktičnim primerom, kjer energija prehaja iz ene oblike v drugo. Učenci spoznajo, kako izračunati delo, moč in energijo ter kako fizikalni pojmi pomagajo razumeti vsakdanje situacije – od dvigovanja predmetov do delovanja strojev.",
      topics: ["energija", "mehanika"]
    },
    {
      title: "Valovanje",
      class: classes[2]._id,
      description: "Uvod v mehansko in elektromagnetno valovanje.",
      date: new Date("2024-11-25"),
      content: "Valovanje je pomemben fizikalni pojav, ki se pojavlja v zvoku, svetlobi, vodi in drugih okoljih. V tej vsebini pojasnimo osnovne lastnosti valov: valovno dolžino, frekvenco, hitrost in amplitudo. Učenci spoznajo razlike med mehanskimi in elektromagnetnimi valovi ter kje se v naravi pojavljajo. Predstavimo pojme interference, resonanče in odboja, pri čemer uporabimo grafične prikaze in vsakdanje primere. Poseben poudarek namenimo razlagi, zakaj se zvok in svetloba prenašata različno ter kako valovi prenašajo energijo, ne pa snovi.",
      topics: ["valovanje", "fizika"]
    },

    // GEOGRAFIJA
    {
      title: "Nastanek reliefa",
      class: classes[3]._id,
      description: "Pregled notranjih in zunanjih procesov oblikovanja površja.",
      date: new Date("2024-09-20"),
      content: "Relief nastaja kot rezultat delovanja notranjih in zunanjih procesov. Vsebina razloži delovanje tektonskih plošč, premikanje kontinentov, vulkanske izbruhe, potrese in druge endogene procese. Poleg tega preučimo erozijo, preperevanje, sedimentacijo ter delovanje vode, vetra in ledu. Učenci spoznajo, kako se oblikujejo gore, doline, planote in drugi reliefni tipi. Posebne primere dopolnimo z resničnimi fotografijami in primeri iz različnih delov sveta. Poudarek je na razumevanju dolgotrajnih procesov, ki spreminjajo Zemljino površje.",
      topics: ["relief", "tektonika"]
    },
    {
      title: "Podnebni tipi sveta",
      class: classes[3]._id,
      description: "Razlaga glavnih klimatskih območij.",
      date: new Date("2024-10-30"),
      content: "Podnebje je odvisno od številnih dejavnikov, kot so geografska širina, nadmorska višina, oddaljenost od morja in zračne mase. V tej uri preučimo glavne podnebne tipe: tropsko, suho, zmerno in polarno podnebje. Za vsak tip navedemo značilne temperature, količino padavin, letne čase ter rastlinstvo. Učenci primerjajo podnebja različnih celin, spoznajo primere mest in držav ter razmišljajo o vplivu podnebja na življenje ljudi, gospodarstvo in prilagoditve živali.",
      topics: ["podnebje", "geografija"]
    },
    {
      title: "Geografske karte",
      class: classes[3]._id,
      description: "Kako beremo karto in uporabljamo zemljevidne projekcije.",
      date: new Date("2024-11-12"),
      content: "Zemljevidi so ključno orodje za razumevanje prostora. Učenci spoznajo vrste kart, od topografskih do tematskih, ter se naučijo pravilnega branja simbolov, meril, barv in projekcij. Razložimo razlike med različnimi projekcijami ter zakaj oblika sveta na karti ni vedno popolnoma natančna. Vadimo orientacijo, uporabo kompasa ter iskanje podatkov na karti, kot so nadmorska višina, gostota prebivalstva ali prometne povezave. Učenci razvijajo prostorske in orientacijske spretnosti.",
      topics: ["karte", "navigacija"]
    },

    // RAČUNALNIŠTVO
    {
      title: "Osnove programiranja",
      class: classes[4]._id,
      description: "Uvod v temeljne strukture programiranja.",
      date: new Date("2024-09-18"),
      content: "Uvod v programiranje temelji na razumevanju spremenljivk, ki predstavljajo mesta v pomnilniku, kjer shranjujemo podatke. Razložimo različne tipe podatkov, kot so cela števila, decimalna števila, nizi in logične vrednosti. Učenci spoznajo, kako spremenljivke ustvarimo, poimenujemo in uporabljamo pri reševanju problemov. S primeri v izbranem programskem jeziku pokažemo, kako se vrednosti spreminjajo in kako lahko vplivajo na delovanje programa. Obravnavamo tudi napake, ki pogosto nastanejo pri delu s spremenljivkami, ter pomen dobrih praks.",
      topics: ["programiranje", "osnove"]
    },
    {
      title: "Algoritmi",
      class: classes[4]._id,
      description: "Razumevanje koncepta algoritma in logičnega razmišljanja.",
      date: new Date("2024-09-25"),
      content: "Algoritmi predstavljajo zaporedje korakov, ki vodijo do rešitve problema. Skozi razlago učenci spoznajo pomen logičnega razmišljanja, razčlenjevanja problemov na manjše dele ter načrtovanja postopkov. Pojasnimo različne vrste algoritmov, uporabo psevdokode in izdelavo diagramov poteka. Učenci rešujejo preproste naloge, pri katerih morajo sami oblikovati učinkovit algoritem. Poseben poudarek namenimo optimizaciji in iskanju najboljših rešitev.",
      topics: ["algoritmi", "logika"]
    },
    {
      title: "Spletne tehnologije",
      class: classes[4]._id,
      description: "Osnovni gradniki spletnih strani.",
      date: new Date("2024-10-05"),
      content: "HTML in CSS sta temeljna gradnika spletnih strani. V vsebini predstavimo osnovno strukturo HTML dokumenta, najpogostejše elemente in njihovo vlogo. Nato razložimo, kako CSS omogoča vizualno oblikovanje: barve, velikosti, poravnave, razmike in pisave. Učenci se naučijo ustvariti preprosto spletno stran, jo oblikovati ter urediti razporeditev elementov. Poudarek je na razumevanju razlike med strukturo in stilom ter pravilni uporabi selektorjev, razredov in identifikatorjev.",
      topics: ["html", "css", "splet"]
    },

    // ZGODOVINA
    {
      title: "Stari Egipt",
      class: classes[5]._id,
      description: "Civilizacija ob Nilu skozi ključne zgodovinske faze.",
      date: new Date("2024-09-10"),
      content: "Stari Egipt je ena najstarejših civilizacij na svetu, znana po svoji izjemni kulturi in napredni družbeni ureditvi. Učenci spoznajo vlogo Nila, faraonov, religije ter odnos med različnimi družbenimi sloji. Razložimo pomen pisave hieroglifov, gradnjo piramid ter razvoj znanosti, kot so matematika, astronomija in medicina. Poudarimo tudi trgovino, umetnost, mitologijo ter vpliv egiptovske civilizacije na kasnejše kulture. Skozi primere in slike učenci lažje razumejo vsakdanje življenje Egipčanov.",
      topics: ["egipt", "civilizacije"]
    },
    {
      title: "Grčija",
      class: classes[5]._id,
      description: "Pregled političnega razvoja stare Grčije.",
      date: new Date("2024-09-20"),
      content: "Stara Grčija je oblikovala temelje zahodne civilizacije. V tej uri preučimo razvoj polisov, razlike med Atenami in Šparto ter nastanek demokratičnih procesov. Učenci spoznajo filozofe, kot so Sokrat, Platon in Aristotel, ter vpliv grške kulture na umetnost, znanost in politiko. Obravnavamo tudi mitologijo, gledališče ter pomen olimpijskih iger. Poudarek je na razumevanju, zakaj Grčijo štejemo za zibelko demokracije in znanosti.",
      topics: ["Grčija", "demokracija"]
    },
    {
      title: "Srednji vek",
      class: classes[5]._id,
      description: "Družbena ureditev in politični sistem v srednjem veku.",
      date: new Date("2024-10-01"),
      content: "Fevdalizem je bil zapleten družbeni in gospodarski sistem, ki je oblikoval evropski srednji vek. Vsebina razloži odnose med kraljem, plemstvom, vazali in kmeti. Učenci spoznajo vlogo cerkve, gradov, zaščite ter vsakdanjega življenja na fevdalnih posestvih. Obravnavamo tudi viteštvo, križarske vojne in simboliko srednjeveške kulture. Cilj je razumevanje hierarhije in temeljnih mehanizmov, ki so urejali družbo.",
      topics: ["srednji vek", "fevdalizem"]
    },
    {
      title: "Industrijska revolucija",
      class: classes[5]._id,
      description: "Tehnološki napredek 18. in 19. stoletja.",
      date: new Date("2024-10-15"),
      content: "Industrijska revolucija je pomenila velik tehnološki preobrat, ki je spremenil proizvodnjo, družbo in način življenja. Učenci spoznajo razvoj parnih strojev, mehanizacijo tovarn, množično proizvodnjo in urbanizacijo. Preučimo tudi negativne posledice, kot so slabši bivalni pogoji, nizke plače in dolgi delovniki. Analiziramo družbene spremembe, razvoj novih ideologij ter vpliv revolucije na nadaljnji tehnološki napredek.",
      topics: ["industrija", "revolucija"]
    }
  ]);

    console.log("🌱 Inserted lectures");
    console.log("✅ Seeding complete!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

export default seed;