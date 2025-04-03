import React, { useEffect, useState } from 'react';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hämta teammedlemmar från backend
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/team');
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
          setLoading(false);
        } else {
          setError('Kunde inte hämta teammedlemmar');
          setLoading(false);
        }
      } catch (err) {
        setError('Något gick fel');
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div>Laddar team...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="contact-container">
      <h2>Vi är här för att hjälpa dig!</h2>
      <p>
        Tack för att du tog dig tid att besöka vår hemsida! Om du har några frågor, funderingar eller bara vill prata om något vi kan assistera dig med, tveka inte att höra av dig. Vi ser fram emot att höra från dig och ge dig den bästa möjliga upplevelsen.
      </p>
      <p>
        Oavsett om du föredrar att ringa, skicka ett e-postmeddelande eller använda vårt kontaktformulär, finns vi här för att hjälpa dig på det sätt som passar dig bäst.
      </p>
      <p>
        Vi värdesätter din tid och ser fram emot att få möjlighet att assistera dig på bästa sätt.
      </p>
      <p>
        Tveka inte att kontakta oss – vi är här för att göra din upplevelse så enkel och smidig som möjligt!
      </p>
      <h2>Vårt Team</h2>
      <div className="team-members">
        {teamMembers.map(member => (
          <div key={member.name} className="team-member">
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.description}</p>
            <img src={`http://localhost:5000/${member.image}`} alt={member.name} />
            <p className="team-member-phone">📞 {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
