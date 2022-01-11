import "../assets/styles/molecule-card.scss"

export const MoleculesIcon = ({ moleculeName }) => {
  let molecule = "";
  let number = 0;

  switch (moleculeName) {
    case "Cadmium":
      molecule = "C";
      number = 48;
      break;
    case "Carbon":
      molecule = "Cd";
      number = 6;
      break;
    case "Hydrogen":
      molecule = "H";
      number = 1;
      break;
    case "Uranium":
      molecule = "U";
      number = 92;
      break;
    case "Xenon":
      molecule = "Xe";
      number = 54;
      break;
    default:
      return( molecule, number)
  }

  return (
    <div className="molecule-card">
      <span className="molecule-number">{number}</span>
      <div className="molecule-name">{molecule}</div>
    </div>
  );
};
