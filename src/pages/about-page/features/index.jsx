const Features = () => {
  const featuresArray = [
    "Create task",
    "Edit task (name, color, time)",
    "Delete task",
    "Drag task to change position",
    "Right click task for options (Long tab on mobile)",
    "Multiple themes",
    "Auto scroll to current hour of the day",
    "Multiple tasks at the same time of the day between (Collision detection)",
    "Change first week of the day",
  ];

  return (
    <section>
      <h3>Features</h3>
      <ul className="list">
        {featuresArray.map((feature, i) => (
          <li key={i}>* {feature}</li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
