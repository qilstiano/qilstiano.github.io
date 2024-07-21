import React, { useEffect } from 'react';
import styles from './Simulation.module.css';

const Simulation = () => {
  useEffect(() => {
    let resourceChar = "✦";
    let resourceColor = "white";
    const predatorColors = ["#FF0000", "#FF4000", "#FF8000", "#FFBF00", "#FFFF00"]; // Gradient from red to yellow
    const superPredatorColors = [
      "#EE82EE",
      "#32CD32", // LimeGreen
      "#1E90FF", // DodgerBlue
      "#FFD700", // Gold
      "#8A2BE2"  // BlueViolet
    ];
    const preyColors = ["#00FFFF", "#00BFFF", "#007FFF", "#0040FF", "#0000FF"]; // Gradient from turquoise to blue
    const normalColors = ["#2F2F2F", "#4F4F4F", "#6F6F6F", "#8F8F8F", "#AFAFAF"];
    const fractalColors = [
      ["#00FA9A", "#3CB371", "#2E8B57", "#008080", "#4682B4"],  // Aqua gradient
      ["#4B0082", "#8A2BE2", "#9400D3", "#9932CC", "#BA55D3"], // Purple gradient
      ["#00FFFF", "#00CED1", "#20B2AA", "#5F9EA0", "#4682B4"], // Cool gradient
      ["#FFD700", "#FFA500", "#FF8C00", "#FF4500", "#FF0000"], // Warm gradient
      ["#7FFF00", "#32CD32", "#228B22", "#006400", "#2E8B57"], // Green gradient
      ["#FF00FF", "#FF69B4", "#FF1493", "#C71585", "#8B008B"], // Original gradient
    ];

    const chars = 'evila∴∵⋮⋰⋱▏▎▍▌▋▊▉▲△▴▵▸▹►▻∴∵⋮⋰⋱◁◂◃◄◅▾▿▼▽▁▂▃▄▅▆▇ ';

    const charSize = 15; // smaller = better resolution
    let cols, rows;
    let beatHistory = [];
    let beatDetected = false;
    let resources = {}; // Using an object for efficient lookups
    let fractalEvent = null; // Fractal event object

    const container = document.getElementById("container");

    function getGradientColor(value, max, colors) {
      const index = Math.floor((value / max) * (colors.length - 1));
      return colors[index];
    }

    class Agent {
      constructor(x, y, type) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);
        this.energy = Math.random() * 100;
        this.type = type; // Type of agent: 'normal', 'predator', 'prey'
        this.state = "moving"; // can be 'moving', 'reproducing', or 'dying'
        this.speed = type === 'predator' ? 0.5 : type === 'prey' ? 0.4 : 0.3; // Adjusted speed to be less aggressive
        this.updated = true; // Flag to indicate if the agent has been updated
        this.validateCoordinates();
      }

      validateCoordinates() {
        if (
          isNaN(this.x) ||
          isNaN(this.y) ||
          this.x < 0 ||
          this.y < 0 ||
          this.x >= cols ||
          this.y >= rows
        ) {
          console.error(
            `Agent has invalid coordinates: ${this.type}, resetting position`
          );
          this.x = Math.floor(Math.random() * cols);
          this.y = Math.floor(Math.random() * rows);
        }
      }

      update() {
        this.updated = false; // Reset update flag

        if (this.type === "predator") {
          this.hunt();
        } else if (this.type === "prey") {
          this.hide();
        } else {
          this.dance();
        }

        // Ensure agents stay within grid bounds
        this.x = (this.x + cols) % cols;
        this.y = (this.y + rows) % rows;

        // Clamp coordinates to prevent NaN values
        this.x = Math.max(0, Math.min(cols - 1, this.x));
        this.y = Math.max(0, Math.min(rows - 1, this.y));

        // Validate coordinates
        this.validateCoordinates();

        // Simple energy depletion
        this.energy -= 0.2; // Slower energy depletion

        // Check for resources and consume them
        const key = `${this.x},${this.y}`;
        if (resources[key]) {
          this.energy += resources[key].energy;
          delete resources[key]; // Remove consumed resource
          this.updated = true;
        }

        // Check for interaction with other agents
        agents.forEach((agent) => {
          if (agent !== this && agent.x === this.x && agent.y === this.y) {
            this.interact(agent);
          }
        });

        // Change state based on energy levels
        if (this.energy <= 0) {
          this.state = "dying";
        } else if (this.energy > 150) {
          this.state = "reproducing";
        }

        // Reproduce by creating a new agent nearby
        if (this.state === "reproducing") {
          const newType =
            Math.random() < 0.1
              ? Math.random() < 0.5
                ? "predator"
                : "prey"
              : this.type;
          agents.push(new Agent(this.x, this.y, newType));
          this.energy -= 50; // Reproduction cost
          this.state = "moving"; // Reset state
          this.updated = true;

          // Rare event: evolve into a super predator
          if (newType === "predator" && Math.random() < 0.75) {
            this.type = "super predator";
            this.speed = 0.6; // Adjusted speed for super predator
            this.energy += 50;
          }
        }

        this.updated = true; // Mark agent as updated
      }

      hunt() {
        // Move towards prey if within a certain radius
        let target = null;
        let minDist = Infinity;
        agents.forEach((agent) => {
          if (agent.type === "prey") {
            const dx = agent.x - this.x;
            const dy = agent.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist && dist < 10) { // Increased detection radius
              minDist = dist;
              target = agent;
            }
          }
        });

        if (target) {
          const dx = target.x - this.x;
          const dy = target.y - this.y;
          this.x += Math.sign(dx); // Move by one step
          this.y += Math.sign(dy); // Move by one step

          // Rare event: prey survives the hunt
          if (Math.random() < 0.001 && target.energy > this.energy) {
            fractalEvent = new FractalEvent(this.x, this.y);
          }
        } else {
          this.dance();
        }
      }

      hide() {
        // Move away from predators if within a certain radius
        let predatorNearby = false;
        agents.forEach((agent) => {
          if (agent.type === "predator" || agent.type === "super predator") {
            const dx = agent.x - this.x;
            const dy = agent.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 10) { // Increased detection radius
              predatorNearby = true;
              this.x -= Math.sign(dx); // Move by one step
              this.y -= Math.sign(dy); // Move by one step
            }
          }
        });

        if (!predatorNearby) {
          this.dance();
        }
      }

      dance() {
        // Random movement
        this.x += Math.sign(Math.floor(Math.random() * 3) - 1); // Move by one step
        this.y += Math.sign(Math.floor(Math.random() * 3) - 1); // Move by one step
      }

      interact(agent) {
        if ((this.type === "predator" || this.type === "super predator") && agent.type === "prey") {
          // Predator consumes prey
          this.energy += agent.energy;
          agent.state = "dying";
        } else if (this.type === "prey" && (agent.type === "predator" || agent.type === "super predator")) {
          // Prey loses energy when encountering predator
          this.energy -= 10; // Reduced energy loss
          if (this.energy < 0) this.state = "dying";
        } else if (this.type === "normal" && agent.type === "normal") {
          // Normal agents transfer energy to each other
          const energyTransfer = Math.min(this.energy, agent.energy) * 0.1;
          this.energy -= energyTransfer;
          agent.energy += energyTransfer;
        }
      }

      render() {
        // Validate coordinates before rendering
        this.validateCoordinates();

        if (this.updated) {
          const index = Math.floor(this.y * cols + this.x);
          if (index >= 0 && index < container.children.length) {
            const charIndex = Math.floor((this.energy / 200) * (chars.length - 1));
            const char = chars[charIndex];
            const element = container.children[index];
            let colors = normalColors;
            if (this.type === "predator") {
              colors = predatorColors;
            } else if (this.type === "super predator") {
              colors = superPredatorColors;
            } else if (this.type === "prey") {
              colors = preyColors;
            }
            element.textContent = char;
            element.style.color = getGradientColor(this.energy, 200, colors);
          } else {
            console.error(
              `Invalid agent index during rendering: ${index}, x: ${this.x}, y: ${this.y}, cols: ${cols}, rows: ${rows}`
            );
            // Reset to valid position if out of bounds
            this.x = Math.floor(Math.random() * cols);
            this.y = Math.floor(Math.random() * rows);
            this.validateCoordinates(); // Validate again after resetting
          }
        }
      }
    }

    class Resource {
      constructor(x, y, energy) {
        this.x = Math.floor(Math.max(0, Math.min(cols - 1, x)));
        this.y = Math.floor(Math.max(0, Math.min(rows - 1, y)));
        this.energy = energy;
        this.updated = true; // Flag to indicate if the resource has been updated
      }

      render() {
        const index = Math.floor(this.y * cols + this.x);
        if (index >= 0 && index < container.children.length) {
          const element = container.children[index];
          element.textContent = resourceChar;
          element.style.color = resourceColor;
          this.updated = false; // Reset update flag after rendering
        } else {
          console.error(
            `Invalid resource index during rendering: ${index}, x: ${this.x}, y: ${this.y}, cols: ${cols}, rows: ${rows}`
          );
          // Reset to valid position if out of bounds
          this.x = Math.floor(Math.random() * cols);
          this.y = Math.floor(Math.random() * rows);
        }
      }
    }

    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    class FractalEvent {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.maxIter = 75;
        this.c = this.getInterestingConstant();
        this.zoom = 0.5;
        this.active = true;
        this.iteration = 0;
        shuffleArray(fractalColors);
        this.fractalColors = fractalColors.flat();
      }

      getInterestingConstant() {
        const constants = [
          { re: -0.7, im: 0.27015 },
          { re: 0.355, im: 0.355 },
          { re: -0.70176, im: -0.3842 },
          { re: -0.835, im: -0.2321 },
          { re: -0.8, im: 0.156 },
          { re: 0.285, im: 0.01 }
        ];
        return constants[Math.floor(Math.random() * constants.length)];
      }

      calculateJulia(x, y) {
        let zx = 1.5 * (x - cols / 2) / (0.5 * this.zoom * cols) + (this.x - cols / 2) / cols;
        let zy = (y - rows / 2) / (0.5 * this.zoom * rows) + (this.y - rows / 2) / rows;
        let i = this.maxIter;
        while (zx * zx + zy * zy < 4 && i > 0) {
          let tmp = zx * zx - zy * zy + this.c.re;
          zy = 2.0 * zx * zy + this.c.im;
          zx = tmp;
          i--;
        }
        return this.maxIter - i;
      }

      update() {
        if (this.iteration < this.maxIter) {
          this.iteration++;
          this.zoom *= 1.1;
        } else {
          this.active = false;
        }
      }

      render() {
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            const n = this.calculateJulia(x, y);
            const index = y * cols + x;
            const element = container.children[index];
            const charIndex = Math.floor((n / this.maxIter) * (chars.length - 1));
            element.textContent = chars[charIndex];
          }
        }
      }
    }

    let agents = [];

    function initializeGrid() {
      container.innerHTML = "";

      const width = window.innerWidth;
      const height = window.innerHeight;

      cols = Math.floor(width / charSize);
      rows = Math.floor(height / charSize);

      container.style.gridTemplateColumns = `repeat(${cols}, ${charSize}px)`;
      container.style.gridTemplateRows = `repeat(${rows}, ${charSize}px)`;

      for (let i = 0; i < cols * rows; i++) {
        const charElement = document.createElement("div");
        charElement.style.width = `${charSize}px`;
        charElement.style.height = `${charSize}px`;
        charElement.style.display = "flex";
        charElement.style.alignItems = "center";
        charElement.style.justifyContent = "center";
        charElement.textContent = " ";
        container.appendChild(charElement);
      }

      // Initialize agents with different types
      for (let i = 0; i < 50; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        const type =
          Math.random() < 0.1
            ? Math.random() < 0.5
              ? "predator"
              : "prey"
            : "normal";
        agents.push(new Agent(x, y, type));
      }

      // Initialize resources
      for (let i = 0; i < 25; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        resources[`${x},${y}`] = new Resource(x, y, Math.random() * 50);
      }
    }

    function animateGrid() {
      agents.forEach((agent) => {
        agent.update();
        agent.render();
      });

      // Clean up dead agents
      agents = agents.filter((agent) => agent.state !== "dying");

      Object.values(resources).forEach((resource) => {
        resource.render();
      });

      // Handle fractal event
      if (fractalEvent) {
        fractalEvent.update();
        fractalEvent.render();
        if (!fractalEvent.active) {
          fractalEvent = null;
        }
      }

      // Limit the number of agents
      if (agents.length > 200) {
        agents = agents.slice(0, 200);
      }

      // Periodically introduce new agents
      if (Math.random() < 0.05) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        const type =
          Math.random() < 0.1
            ? Math.random() < 0.5
              ? "predator"
              : "prey"
            : "normal";
        agents.push(new Agent(x, y, type));
      }

      // Periodically add new resources
      if (Math.random() < 0.05) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        resources[`${x},${y}`] = new Resource(x, y, Math.random() * 50);
      }

      requestAnimationFrame(animateGrid);
    }

    container.addEventListener("click", (event) => {
      const rect = container.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / charSize);
      const y = Math.floor((event.clientX - rect.left) / charSize);
      agents.push(new Agent(x, y, "prey"));
    });

    container.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const rect = container.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / charSize);
      const y = Math.floor((event.clientX - rect.left) / charSize);
      agents.push(new Agent(x, y, "predator"));
    });

    window.onload = () => {
      initializeGrid();
      animateGrid(); // Start the animation without audio
    };

    window.onresize = () => {
      initializeGrid();
    };
  }, []);

  return (
    <div className={styles.simulationContainer}>
      <div id="container" className="w-full h-full grid"></div>
    </div>
  );
  
};

export default Simulation;
