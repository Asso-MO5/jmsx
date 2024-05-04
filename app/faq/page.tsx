const questions = [
  {
    question: 'Puis-je acheter plusieurs places avec le même compte PayPal ?',
    answer:
      "Oui, bien que les billets portent le nom de l'acheteur, chaque billet dispose d'un code unique.",
  },
  {
    question: 'La convention est-elle internationale ?',
    answer:
      'JMSX est principalement destinée à un public francophone. Certaines conférences peuvent être proposées en anglais, mais une traduction en français sera disponible.',
  },
  {
    question: "J'ai perdu mon billet, comment puis-je le récupérer ?",
    answer:
      "Vous pouvez regénérer votre billet en vous rendant sur notre page de génération de billets : <a href=\"https://jmsx.mo5.com/ticket/generer\">Générer un billet</a>. Il vous sera demandé d'indiquer l'adresse e-mail associée au compte PayPal utilisé pour l'achat. Un e-mail de validation vous sera envoyé, et si plusieurs billets ont été achetés avec le même compte, vous recevrez un billet pour chaque entrée commandée.",
  },
  {
    question:
      'Je suis exposant, mais je viens avec des membres de ma famille qui ont des billets de visiteur. Peuvent-ils accéder à JMSX aux horaires prévus pour les exposants ?',
    answer:
      "Oui, si les billets ont été achetés avec le même compte, les visiteurs peuvent accéder à la convention en même temps que l'exposant.",
  },
  {
    question:
      'Puis-je apporter mon propre matériel même si je suis un visiteur ?',
    answer:
      'Bien sûr, un atelier de réparation est prévu pour les visiteurs qui souhaitent apporter leur propre matériel.',
  },
  {
    question: "Je suis exposant et j'ai des articles à vendre, est-ce permis ?",
    answer:
      "Absolument. Toutefois, nous insistons sur le fait que toute personne prise en train de vendre des articles contrefaits (comme une copie non licenciée d'un vieux jeu, par exemple) sera exclue définitivement de la convention sans possibilité de remboursement.",
  },
  {
    question:
      "J'ai d'autres questions, comme le covoiturage. Où puis-je obtenir des informations ?",
    answer:
      'JMSX est une convention organisée par l\'association MO5 et le Village MSX. Pour toute organisation concernant le covoiturage ou d\'autres aspects logistiques, nous vous invitons à visiter le forum dédié à la convention : <a href="https://msxvillage.fr/forum/topic-4441-8+j-msx-paris-11-22-23-juin-2024.php#m100397">Forum Village MSX</a>.',
  },
]

export default function Faq() {
  return (
    <main className="relative flex flex-col gap-3 max-w-[512px] m-auto">
      <div className="flex flex-col p-4 gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-msx-magenta border-b border-msx-magenta">FAQ</h1>

          {questions.map((q) => (
            <div key={q.question} className="p-2 border border-msx-darkBlue">
              <h2 className="text-base">{q.question}</h2>
              <div dangerouslySetInnerHTML={{ __html: q.answer }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
