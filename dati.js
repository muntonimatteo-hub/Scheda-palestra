// SCHEDA DI ALLENAMENTO
// Per cambiare la scheda modifica solo questo file.
// sets = serie, reps = ripetizioni, kg = carico iniziale (facoltativo)
// type: P = principale (recupero 2-3 min), C = complementare (60-120 s)
// opts: il primo è l'esercizio previsto, gli altri sono i sostituti [nome, spiegazione]
const PLAN = [
 { id:"mar", day:"Martedì", focus:"Upper A · forza e massa", tab:"Upper A", blocks:[
  { name:"Addominali", ex:[
   { id:"m1", sets:3, reps:"10", type:"C", opts:[
     ["Ab Wheel","Parti in ginocchio, bacino in retroversione e glutei contratti. Allunga finché riesci a non inarcare la schiena, poi torna tirando con l’addome, non con le braccia."],
     ["Rollout con bilanciere","Stessa tecnica dell’Ab Wheel con dischi tondi sul bilanciere: schiena neutra, rientra con l’addome."],
     ["Body saw sui gomiti","In plank sui gomiti spingi il corpo avanti e indietro di pochi centimetri senza far cedere il bacino."] ]},
   { id:"m2", sets:3, reps:"15", type:"C", opts:[
     ["Cable Crunch","In ginocchio, corda ai lati della testa. Arrotola la colonna portando i gomiti verso le cosce; le anche restano ferme."],
     ["Crunch alla macchina","Arrotola il busto senza tirare con le braccia, un secondo di contrazione in basso."],
     ["Crunch su panca declinata","Sali solo finché le scapole si staccano bene, scendi lento senza appoggiare del tutto."] ]}
  ]},
  { name:"Pettorali", ex:[
   { id:"m3", sets:4, reps:"6", type:"P", opts:[
     ["Panca piana con bilanciere","Scapole addotte e depresse, piedi saldi a terra. Il bilanciere scende sulla parte bassa del petto in 2-3 s, gomiti a circa 45°, poi spingi deciso."],
     ["Panca piana con manubri","Manubri all’altezza del petto in basso, gomiti a 45°, spingi convergendo leggermente senza far toccare i manubri."],
     ["Panca piana al multipower","Posiziona la panca in modo che la barra scenda sulla parte bassa del petto; stesso ritmo della panca libera."] ]},
   { id:"m4", sets:3, reps:"8-10", type:"C", opts:[
     ["Chest Press convergente","Maniglie all’altezza del petto, schiena aderente. Spingi in avanti e verso il centro, ritorno lento fino a sentire l’allungamento."],
     ["Chest Press orizzontale","Gomiti leggermente sotto le spalle, non bloccare le braccia in fondo."],
     ["Spinte manubri su panca a 15°","Leggera inclinazione, discesa lenta, spinta controllata."] ]},
   { id:"m5", sets:3, reps:"12-15", type:"C", opts:[
     ["Croci ai cavi","Gomiti leggermente flessi e fissi. Apri fino all’allungamento del petto, chiudi come ad abbracciare un tronco, un secondo di contrazione."],
     ["Pectoral Machine (Pec Deck)","Schiena aderente, chiudi con il petto e non con le mani, ritorno lento."],
     ["Croci con manubri su panca piana","Apri solo fino all’altezza del petto, gomiti morbidi, risali lentamente."] ]}
  ]},
  { name:"Schiena", ex:[
   { id:"m6", sets:4, reps:"8-10", kg:50, type:"P", opts:[
     ["Lat Machine presa neutra","Petto alto, leggera inclinazione indietro. Abbassa le scapole e porta i gomiti verso i fianchi fino al petto; risali lento fino a braccia distese."],
     ["Trazioni assistite presa neutra","Partenza da braccia distese, sali portando il petto verso le maniglie, discesa in 3 s."],
     ["Lat Machine unilaterale","Un braccio alla volta, gomito che scende verso il fianco, busto fermo."] ]},
   { id:"m7", sets:3, reps:"10", type:"C", opts:[
     ["Rematore con chest support","Petto appoggiato, tira i gomiti indietro vicino al corpo e stringi le scapole un secondo; il petto non si stacca."],
     ["Rematore T-bar","Schiena neutra, busto a circa 45°, tira verso l’ombelico."],
     ["Rematore con manubrio unilaterale","Mano e ginocchio sulla panca, tira il gomito verso l’anca senza ruotare il busto."] ]}
  ]},
  { name:"Spalle", ex:[
   { id:"m8", sets:3, reps:"8-10", type:"P", opts:[
     ["Military Press con manubri","Seduto con schienale quasi verticale, manubri all’altezza delle orecchie. Spingi in alto senza inarcare la schiena, discesa lenta."],
     ["Shoulder Press alla macchina","Maniglie all’altezza delle spalle, spinta senza bloccare i gomiti."],
     ["Military Press con bilanciere in piedi","Glutei e addome contratti, barra che sale vicino al viso, testa che avanza sotto la barra in alto."] ]},
   { id:"m9", sets:3, reps:"15", type:"C", opts:[
     ["Alzate laterali ai cavi","Cavo basso dietro la gamba. Solleva il braccio di lato fino all’altezza della spalla guidando con il gomito; niente slanci col busto."],
     ["Alzate laterali con manubri","Busto leggermente avanti, solleva fino alla spalla, discesa in 2-3 s."],
     ["Lateral raise alla macchina","Gomiti contro i cuscinetti, sali fino alla spalla, un secondo di tenuta."] ]}
  ]},
  { name:"Glutei", ex:[
   { id:"m10", sets:3, reps:"12", unit:"per gamba", type:"C", added:true, opts:[
     ["Glute Kickback ai cavi","Cavigliera al cavo basso, busto leggermente inclinato. Spingi la gamba indietro con il gluteo, senza inarcare la schiena; un secondo di contrazione."],
     ["Glute Bridge monopodalico","Una gamba piegata, l’altra sollevata. Spingi col tallone fino ad allineare spalla, anca e ginocchio."],
     ["Kickback alla macchina","Spinta indietro col tallone, bacino fermo, ritorno lento."] ]}
  ]}
 ]},
 { id:"gio", day:"Giovedì", focus:"Lower · gambe e glutei", tab:"Lower", blocks:[
  { name:"Addominali", ex:[
   { id:"g1", sets:3, reps:"12", type:"C", opts:[
     ["Hanging Leg Raise","Appeso alla sbarra, porta le gambe in alto arrotolando il bacino; scendi lento senza oscillare."],
     ["Knee Raise alla sedia romana","Schiena appoggiata, porta le ginocchia al petto staccando il bacino, discesa controllata."],
     ["Reverse Crunch su panca","Sdraiato, porta le ginocchia verso il petto sollevando il bacino dalla panca."] ]}
  ]},
  { name:"Glutei e femorali", ex:[
   { id:"g2", sets:4, reps:"8", type:"P", opts:[
     ["Romanian Deadlift con bilanciere","Ginocchia appena piegate, porta il bacino indietro con la schiena neutra; il bilanciere scivola lungo le cosce fino a metà tibia o all’allungamento dei femorali, poi spingi l’anca avanti."],
     ["Romanian Deadlift con manubri","Stessa tecnica, manubri vicini alle gambe, schiena sempre neutra."],
     ["Good Morning","Bilanciere sulle spalle, piega in avanti dall’anca con ginocchia morbide, risali contraendo i glutei."] ]},
   { id:"g3", sets:3, reps:"10", type:"P", opts:[
     ["Hip Thrust (macchina o bilanciere)","Scapole sulla panca, piedi alla larghezza delle anche. Spingi coi talloni fino ad allineare busto e cosce, mento verso il petto, un secondo di contrazione in alto."],
     ["Hip Thrust al multipower","Stessa posizione, la guida aiuta la stabilità: concentrati sulla contrazione in alto."],
     ["Glute Bridge con bilanciere","A terra, escursione più corta: spingi coi talloni e tieni la contrazione 2 s."] ]}
  ]},
  { name:"Quadricipiti", ex:[
   { id:"g4", sets:4, reps:"8-10", kg:60, type:"P", opts:[
     ["Hack Squat","Schiena aderente, piedi a metà pedana. Scendi in 3 s almeno con le cosce parallele, ginocchia in linea con le punte, risali spingendo con tutto il piede."],
     ["Leg Press","Piedi a metà pedana, scendi finché il bacino resta appoggiato, non bloccare le ginocchia in alto."],
     ["Squat al multipower","Piedi leggermente avanti, scendi controllato almeno al parallelo, busto stabile."] ]},
   { id:"g5", sets:3, reps:"10", unit:"per gamba", type:"C", opts:[
     ["Bulgarian Split Squat con manubri","Piede dietro sulla panca. Scendi in verticale finché il ginocchio posteriore sfiora terra; busto leggermente avanti per più glutei."],
     ["Affondi indietro con manubri","Passo indietro, scendi in verticale, risali spingendo col piede davanti."],
     ["Step-up su panca","Sali spingendo solo con la gamba sulla panca, scendi lento."] ]}
  ]},
  { name:"Femorali", ex:[
   { id:"g6", sets:3, reps:"10-12", type:"C", opts:[
     ["Leg Curl sdraiato","Bacino premuto sulla panca. Porta i talloni verso i glutei, un secondo di contrazione, discesa in 3 s."],
     ["Leg Curl seduto","Cosce bloccate dal cuscinetto, flessione completa, ritorno lento."],
     ["Nordic Curl assistito","Ginocchia a terra, caviglie bloccate, scendi più lentamente possibile aiutandoti con le mani."] ]}
  ]},
  { name:"Polpacci", ex:[
   { id:"g7", sets:4, reps:"12-15", type:"C", opts:[
     ["Calf Raise alla pressa","Avampiede sul bordo, scendi in allungamento con 2 s di pausa, sali in punta e tieni 1 s."],
     ["Calf Raise in piedi alla macchina","Ginocchia distese ma non bloccate, massima escursione."],
     ["Calf Raise seduto","Lavora di più il soleo: stessa pausa in allungamento."] ]}
  ]},
  { name:"Glutei (gluteo medio)", ex:[
   { id:"g9", sets:3, reps:"15", type:"C", added:true, opts:[
     ["Abductor Machine","Busto leggermente in avanti per coinvolgere i glutei. Apri le gambe, tieni un secondo, rientra lento."],
     ["Abduzione ai cavi in piedi","Cavigliera al cavo basso, porta la gamba di lato senza inclinare il busto."],
     ["Camminata laterale con elastico","Elastico sopra le ginocchia, mezzo squat, passi laterali corti senza far avvicinare i piedi."] ]}
  ]},
  { name:"Core", ex:[
   { id:"g8", sets:3, reps:"12", unit:"per lato", type:"C", opts:[
     ["Pallof Press ai cavi","Di fianco al cavo, maniglia al petto. Spingi le braccia avanti e resisti alla rotazione, 1 s di tenuta, rientra."],
     ["Pallof Press con elastico","Stessa tecnica con elastico fissato all’altezza del petto."],
     ["Plank laterale","Gomito sotto la spalla, corpo in linea; conta 3 s per ogni «ripetizione»."] ]}
  ]}
 ]},
 { id:"ven", day:"Venerdì", focus:"Upper B · ipertrofia", tab:"Upper B", blocks:[
  { name:"Addominali", ex:[
   { id:"v1", sets:3, reps:"15", type:"C", opts:[
     ["Crunch su panca inclinata con disco","Disco sul petto, sali arrotolando la colonna, scendi lento senza appoggiare del tutto."],
     ["Cable Crunch","In ginocchio, arrotola la colonna verso le cosce, anche ferme."],
     ["Crunch alla macchina","Contrazione di un secondo in basso, ritorno lento."] ]}
  ]},
  { name:"Pettorali", ex:[
   { id:"v2", sets:4, reps:"8-10", kg:13, type:"P", opts:[
     ["Panca inclinata con bilanciere","Panca a 30°, scapole addotte. Il bilanciere scende sotto le clavicole in 2-3 s, poi spingi in alto."],
     ["Panca inclinata con manubri","Panca a 30°, manubri ai lati del petto alto, spinta convergente."],
     ["Incline Press alla macchina","Maniglie all’altezza del petto alto, ritorno lento."] ]},
   { id:"v3", sets:3, reps:"8-12", type:"C", opts:[
     ["Dips assistite con busto inclinato","Busto in avanti, gomiti leggermente aperti. Scendi finché le spalle sono appena sotto i gomiti, risali spingendo."],
     ["Dips alla macchina","Busto inclinato, escursione completa ma senza fastidio alle spalle."],
     ["Spinte con manubri su panca declinata","Leggera declinazione, discesa lenta, spinta convergente."] ]}
  ]},
  { name:"Schiena", ex:[
   { id:"v4", sets:4, reps:"10", kg:55, type:"P", opts:[
     ["Pulley basso","Schiena dritta, busto fermo. Tira la maniglia verso l’ombelico stringendo le scapole, ritorno lento allungando le braccia."],
     ["Rematore alla macchina","Petto appoggiato, gomiti vicini al corpo, scapole strette un secondo."],
     ["Rematore con manubrio","Gomito verso l’anca, busto fermo."] ]},
   { id:"v5", sets:3, reps:"10-12", kg:55, type:"C", opts:[
     ["Lat Machine presa larga","Presa poco più larga delle spalle, porta la barra al petto alto abbassando le scapole; non tirare dietro la nuca."],
     ["Trazioni assistite presa larga","Petto verso la sbarra, discesa in 3 s fino a braccia distese."],
     ["Pulldown unilaterale ai cavi","Un braccio alla volta, gomito che scende verso il fianco."] ]}
  ]},
  { name:"Spalle", ex:[
   { id:"v6", sets:3, reps:"10", kg:55, type:"C", opts:[
     ["Shoulder Press alla macchina","Schiena aderente, maniglie all’altezza delle spalle, spingi senza bloccare i gomiti."],
     ["Military Press con manubri","Seduto, manubri all’altezza delle orecchie, niente inarcamento."],
     ["Arnold Press","Parti con i palmi verso di te e ruota mentre spingi in alto."] ]},
   { id:"v7", sets:3, reps:"15", kg:30, type:"C", opts:[
     ["Reverse Pec Deck","Petto contro lo schienale, braccia quasi tese. Apri indietro con i deltoidi posteriori, senza stringere troppo le scapole."],
     ["Face Pull ai cavi","Corda all’altezza del viso, tira verso la fronte aprendo i gomiti in alto."],
     ["Alzate posteriori con manubri","Busto flesso in avanti, apri di lato con gomiti morbidi."] ]}
  ]},
  { name:"Bicipiti", ex:[
   { id:"v8", sets:3, reps:"10-12", type:"C", opts:[
     ["Curl su panca Scott","Tricipiti appoggiati. Sali senza staccare i gomiti, scendi in 3 s fino a quasi distendere il braccio."],
     ["Curl Scott alla macchina","Stessa tecnica, discesa lenta."],
     ["Curl con manubri su panca inclinata","Braccia lungo il corpo in allungamento, gomiti fermi."] ]},
   { id:"v9", sets:3, reps:"12", type:"C", opts:[
     ["Curl ai cavi con corda","Gomiti fermi ai fianchi, sali aprendo leggermente la corda in alto."],
     ["Hammer Curl con manubri","Presa neutra, gomiti fermi, niente slanci."],
     ["Curl con bilanciere EZ","Gomiti ai fianchi, discesa controllata."] ]}
  ]},
  { name:"Tricipiti", ex:[
   { id:"v10", sets:3, reps:"10-12", type:"C", opts:[
     ["French Press con bilanciere EZ","Sdraiato, braccia verticali. Piega solo i gomiti portando la barra verso la fronte, gomiti fermi e stretti."],
     ["French Press con manubri","Stessa tecnica con presa neutra."],
     ["Estensioni sopra la testa ai cavi","Di spalle al cavo, gomiti vicini alla testa, distendi completamente."] ]},
   { id:"v11", sets:3, reps:"12-15", type:"C", opts:[
     ["Push Down con corda","Gomiti incollati ai fianchi, spingi in basso aprendo la corda in fondo."],
     ["Push Down con barra dritta","Gomiti fermi, distensione completa."],
     ["Kickback ai cavi","Busto inclinato, gomito alto e fermo, distendi indietro."] ]}
  ]},
  { name:"Presa e trapezi", ex:[
   { id:"v12", sets:3, reps:"40 m", repsLabel:"metri", type:"C", opts:[
     ["Farmer Walk","Manubri pesanti ai fianchi, spalle basse, petto alto. Passi corti e regolari, addome contratto."],
     ["Farmer Walk con trap bar","Stessa camminata con la trap bar, carico più alto."],
     ["Tenuta statica con manubri","Se manca spazio: in piedi con manubri pesanti per 40 s."] ]}
  ]},
  { name:"Glutei", ex:[
   { id:"v13", sets:3, reps:"12", type:"C", added:true, opts:[
     ["Iperestensioni a 45° per glutei","Bacino appena sopra il cuscinetto, schiena leggermente arrotondata, piedi extraruotati. Risali spingendo il bacino sul cuscinetto con i glutei."],
     ["Hip Thrust monopodalico","Scapole sulla panca, una gamba alla volta, contrazione di 1 s in alto."],
     ["Glute Bridge con elastico","Elastico sopra le ginocchia, spingi le ginocchia in fuori mentre sali."] ]}
  ]}
 ]}
];
