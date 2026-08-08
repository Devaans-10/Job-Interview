import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  x = 0,
  y = 0,
  className = '',
  once = true,
  amount = 0.1,
  margin = '50px'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
