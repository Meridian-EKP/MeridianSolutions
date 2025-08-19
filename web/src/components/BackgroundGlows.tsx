"use client";

export default function BackgroundGlows() {
  return (
    <div className="glow-field" aria-hidden>
      {/* Blue glow dots */}
      <span
        className="glow-dot blue-dot"
        style={{
          left: "5%",
          top: "100px",
          width: "450px",
          height: "450px",
          filter: "blur(90px)",
          opacity: 0.4,
        }}
      />
      <span
        className="glow-dot blue-dot"
        style={{
          left: "85%",
          top: "500px",
          width: "380px",
          height: "380px",
          filter: "blur(75px)",
          opacity: 0.3,
        }}
      />
      <span
        className="glow-dot blue-dot"
        style={{
          left: "20%",
          top: "1000px",
          width: "520px",
          height: "520px",
          filter: "blur(105px)",
          opacity: 0.45,
        }}
      />
      <span
        className="glow-dot blue-dot"
        style={{
          left: "75%",
          top: "1600px",
          width: "420px",
          height: "420px",
          filter: "blur(85px)",
          opacity: 0.35,
        }}
      />
      <span
        className="glow-dot blue-dot"
        style={{
          left: "15%",
          top: "2200px",
          width: "480px",
          height: "480px",
          filter: "blur(95px)",
          opacity: 0.38,
        }}
      />
      
      {/* Purple glow dots */}
      <span
        className="glow-dot purple-dot"
        style={{
          left: "70%",
          top: "200px",
          width: "500px",
          height: "500px",
          filter: "blur(100px)",
          opacity: 0.42,
        }}
      />
      <span
        className="glow-dot purple-dot"
        style={{
          left: "25%",
          top: "700px",
          width: "340px",
          height: "340px",
          filter: "blur(70px)",
          opacity: 0.28,
        }}
      />
      <span
        className="glow-dot purple-dot"
        style={{
          left: "90%",
          top: "1200px",
          width: "460px",
          height: "460px",
          filter: "blur(90px)",
          opacity: 0.4,
        }}
      />
      <span
        className="glow-dot purple-dot"
        style={{
          left: "10%",
          top: "1800px",
          width: "400px",
          height: "400px",
          filter: "blur(80px)",
          opacity: 0.32,
        }}
      />
      <span
        className="glow-dot purple-dot"
        style={{
          left: "80%",
          top: "2400px",
          width: "440px",
          height: "440px",
          filter: "blur(88px)",
          opacity: 0.35,
        }}
      />
    </div>
  );
}


