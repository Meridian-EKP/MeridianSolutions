"use client";

export default function BackgroundGlows() {
  return (
    <div className="glow-field" aria-hidden>
      {/* Blue glow dots */}
      <span
        className="glow-dot blue-dot pulse-dot"
        style={{
          left: "-5%",
          top: "-200px",
          width: "520px",
          height: "520px",
          filter: "blur(90px)",
          animationDelay: "0s",
        }}
      />
      
      <span
        className="glow-dot blue-dot pulse-dot"
        style={{
          left: "85%",
          top: "1100px",
          width: "380px",
          height: "380px",
          filter: "blur(75px)",
          animationDelay: "0.5s",
        }}
      />
      
      <span
        className="glow-dot blue-dot pulse-dot"
        style={{
          left: "5%",
          top: "1600px",
          width: "520px",
          height: "520px",
          filter: "blur(105px)",
          animationDelay: "1s",
        }}
      />
      
      <span
        className="glow-dot blue-dot pulse-dot"
        style={{
          left: "82%",
          top: "2500px",
          width: "420px",
          height: "420px",
          filter: "blur(85px)",
          animationDelay: "1.5s",
        }}
      />
      
      <span
        className="glow-dot blue-dot pulse-dot"
        style={{
          left: "-3%",
          top: "3000px",
          width: "480px",
          height: "480px",
          filter: "blur(95px)",
          animationDelay: "2s",
        }}
      />
      
      {/* Purple glow dots */}
      <span
        className="glow-dot purple-dot pulse-dot"
        style={{
          left: "65%",
          top: "100px",
          width: "1400px",
          height: "1400px",
          filter: "blur(100px)",
          animationDelay: "0.25s",
        }}
      />
      
      <span
        className="glow-dot purple-dot pulse-dot"
        style={{
          left: "-8%",
          top: "1600px",
          width: "340px",
          height: "340px",
          filter: "blur(70px)",
          animationDelay: "0.75s",
        }}
      />
      
      <span
        className="glow-dot purple-dot pulse-dot"
        style={{
          left: "83%",
          top: "2100px",
          width: "460px",
          height: "460px",
          filter: "blur(90px)",
          animationDelay: "1.25s",
        }}
      />
      
      <span
        className="glow-dot purple-dot pulse-dot"
        style={{
          left: "14%",
          top: "2800px",
          width: "400px",
          height: "400px",
          filter: "blur(80px)",
          animationDelay: "1.75s",
        }}
      />
      
      <span
        className="glow-dot purple-dot pulse-dot"
        style={{
          left: "89%",
          top: "3500px",
          width: "440px",
          height: "440px",
          filter: "blur(88px)",
          animationDelay: "2.25s",
        }}
      />
    </div>
  );
}


