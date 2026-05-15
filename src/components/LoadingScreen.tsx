import { AnimatePresence, motion } from "framer-motion";
import { company } from "../data/site";

export function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-carbon"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="text-center">
            <motion.img
              src={company.logo}
              alt="Vikings Car Care logo"
              className="mx-auto h-24 w-auto"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
            <motion.div className="mx-auto mt-7 h-px w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-vikingRed to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
