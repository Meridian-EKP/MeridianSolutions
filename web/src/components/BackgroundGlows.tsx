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
          animation: "pulse 8.5s ease-in-out infinite",
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
          animation: "pulse 12.3s ease-in-out infinite",
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
          animation: "pulse 7.2s ease-in-out infinite",
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
          animation: "pulse 15.8s ease-in-out infinite",
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
          animation: "pulse 9.4s ease-in-out infinite",
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
          animation: "pulse 11.7s ease-in-out infinite",
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
          animation: "pulse 6.9s ease-in-out infinite",
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
          animation: "pulse 13.6s ease-in-out infinite",
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
          animation: "pulse 10.1s ease-in-out infinite",
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
          animation: "pulse 14.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}


