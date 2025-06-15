"use client";
import React, { useContext } from "react";
import { Badge } from "../ui/badge";
import { BorderBeam } from "../magicui/border-beam";
import { BioContext } from "@/context/BioContext";
import { Skeleton } from "../ui/skeleton";
import { FileOutput, Rocket } from "lucide-react";
import CopyLabel from "./CopyLabel";

const Output = () => {
  const { output, loading } = useContext(BioContext);

  return (
    <div className="relative w-full">
      <div className="sticky top-6">
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
          {loading && (
            <BorderBeam
              size={1200}
              borderWidth={2}
              duration={3}
              className="z-10"
              colorFrom="#8b5cf6"
              colorTo="#06b6d4"
            />
          )}
            <div className="flex items-center justify-between p-6 border-b border-border/30 bg-gradient-to-r from-card/80 to-card/40">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-md"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-md"></div>
              <h2 className="text-lg font-semibold text-foreground ml-4">Generated Bios</h2>
            </div>            <Badge variant="outline" className="bg-gradient-to-r from-accent/20 to-primary/20 border-accent/40 text-accent font-medium flex items-center gap-1.5 px-3 py-1.5">
              <FileOutput className="w-3.5 h-3.5" />
              Output
            </Badge>
          </div>

          <div className="min-h-[60vh] max-h-[80vh] overflow-y-auto">
            {loading ? (
              <div className="p-8 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-4 w-full bg-gradient-to-r from-muted to-muted/50" />
                    <Skeleton className="h-4 w-4/5 bg-gradient-to-r from-muted to-muted/50" />
                    <Skeleton className="h-4 w-3/5 bg-gradient-to-r from-muted to-muted/50" />
                  </div>
                ))}
              </div>
            ) : output?.data.length ? (
              <ul className="p-6 space-y-6">
                {output.data.map((data, index) => {
                  return (
                    <li
                      key={index}
                      className="group relative bg-gradient-to-br from-card/80 to-card/40 border border-border/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                    >
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <CopyLabel text={data.bio} />
                      </div>
                      <p className="text-sm md:text-base leading-relaxed text-foreground/90 pr-8">
                        {data.bio}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Bio {index + 1} • {data.bio.length} characters
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (              <div className="flex items-center justify-center h-96 text-center">
                <div className="space-y-6">                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center border border-accent/20 shadow-lg">
                    <Rocket className="w-10 h-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">Ready to Generate</h3>
                    <p className="text-muted-foreground max-w-sm leading-relaxed">
                      Fill in your details and click "Generate Bio" to get started with your platform-optimized bios.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Output;
