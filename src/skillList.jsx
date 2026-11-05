function SkillList(){
const language= [
  { title: "Inception", year: 2010 },
  { title: "Interstellar", year: 2014 },
  { title: "Avatar", year: 2009 }
];
 return (
    <div>
      <h1>language list</h1>
<ul>
      {language.map((siu) => (
        <li key={siu.title}>title:{siu.title}, year:{siu.year}</li>
      ))}</ul>
    </div>
  );
}
export default SkillList;