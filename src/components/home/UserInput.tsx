"use client";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetaIcon from "../icons/Meta";
import TwitterIcon from "../icons/Twitter";
import InstagramIcon from "../icons/Instagram";
import LinkedInIcon from "../icons/LinkedIn";
import { Slider } from "../ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { 
  Info, 
  Loader2, 
  Settings, 
  FileText, 
  Sparkles, 
  Cpu, 
  Globe, 
  Palette, 
  Hash, 
  Zap,
  User,
  Building2,
  Smile,
  MessageSquare,
  Brain,
  Sliders,
  Wand2,
  Tag
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { generateBio } from "@/app/actions";
import { BioContext } from "@/context/BioContext";

const formSchema = z.object({
  model: z.string().min(1, "Model is required!"),
  platform: z.enum(["twitter", "instagram", "linkedin"], {
    errorMap: () => ({ message: "Platform is required!" }),
  }),
  temperature: z
    .number()
    .min(0, "Temperature must be atleast 0")
    .max(2, "Temperature must be at most 1"),
  content: z
    .string()
    .min(1, "Content is required.")
    .max(500, "Content should not exceed 500 character limit."),
  type: z.enum(["personal", "brand"], {
    errorMap: () => ({ message: "Type is required!" }),
  }),
  tone: z.enum(
    [
      "professional",
      "casual",
      "sarcastic",
      "funny",
      "passionate",
      "thoughtful",
    ],
    {
      errorMap: () => ({ message: "Tone is required!" }),
    }
  ),
  emojis: z.boolean(),
});

const UserInput = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "llama3-8b-8192",
      platform: "twitter",
      temperature: 1,
      content: "",
      type: "personal",
      tone: "professional",
      emojis: false,
    },
  });
  const { setOutput, setLoading, loading } = useContext(BioContext);

  // Watch the platform field to update placeholder text
  const selectedPlatform = form.watch("platform");

  // Dynamic placeholder text based on selected platform
  const getPlaceholderText = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "Add your old Twitter/X bio or write a few sentences about yourself for your Twitter profile";
      case "instagram":
        return "Add your old Instagram bio or write a few sentences about yourself for your Instagram profile";
      case "linkedin":
        return "Add your old LinkedIn headline/summary or write a few sentences about yourself for your LinkedIn profile";
      default:
        return "Add your old bio or write a few sentences about yourself";
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    setLoading(true);    const userInputValues = `
    Platform: ${values.platform},
    User Input: ${values.content},
    Bio Tone: ${values.tone},
    Bio Type: ${values.type},
    Add Emojis: ${values.emojis}
    `;
    try {
      const { data } = await generateBio(
        userInputValues,
        values.temperature,
        values.model,
        values.platform,
        true // Always use RAG
      );
      // console.log(data);
      setOutput(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full">
      <div className="sticky top-6 space-y-6">
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500"></div>
            <h2 className="text-lg font-semibold text-foreground ml-4">Bio Generator</h2>
          </div>
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >              <fieldset className="space-y-6 rounded-xl border border-border/30 p-6 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm">                <legend className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg text-accent flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Configuration
                </legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Cpu className="w-4 h-4 text-accent" />
                      Model
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="llama3-8b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Llama 3
                                  </span>
                                  8B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="llama3-70b-8192">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MetaIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium mr-2">
                                    Llama 3
                                  </span>
                                  70B
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Globe className="w-4 h-4 text-accent" />
                      Platform
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="twitter">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <TwitterIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium">
                                    Twitter/X
                                  </span>
                                </p>
                                <p className="text-xs">Up to 160 chars</p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="instagram">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <InstagramIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium">
                                    Instagram
                                  </span>
                                </p>
                                <p className="text-xs">Up to 150 chars</p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="linkedin">
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <LinkedInIcon className="size-5" />
                              <div>
                                <p>
                                  <span className="text-foreground font-medium">
                                    LinkedIn
                                  </span>
                                </p>
                                <p className="text-xs">Up to 220 chars</p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="temperature"
                render={({ field: { value, onChange } }) => (
                  <FormItem>                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Palette className="w-4 h-4 text-accent" />
                        Creativity
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 ml-1 cursor-pointer text-muted-foreground hover:text-accent transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent
                            sideOffset={25}
                            collisionPadding={20}
                            className="max-w-sm"
                          >
                            <p>
                              A higher setting produces more creative and
                              surprising bios, while a lower setting sticks to
                              more predictable and conventional styles.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </span>
                      <span className="text-xs font-mono bg-accent/10 px-2 py-1 rounded-md text-accent">{value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[1]}
                        min={0}
                        max={2}
                        step={0.1}
                        onValueChange={(val) => {
                          onChange(val[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>          <fieldset className="space-y-6 rounded-xl border border-border/30 p-6 bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-sm">            <legend className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg text-accent flex items-center gap-2">
              <FileText className="w-4 h-4" />
              User Input
            </legend>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>                    <FormLabel className="flex items-center justify-between pb-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <User className="w-4 h-4 text-accent" />
                        About Yourself
                      </span>
                    </FormLabel>                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={getPlaceholderText(selectedPlatform)}
                        className="min-h-[10rem]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Tag className="w-4 h-4 text-accent" />
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="brand">Brand</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      Tone
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="passionate">Passionate</SelectItem>
                        <SelectItem value="thoughtful">Thoughtful</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="emojis"
                render={({ field }) => (                  <FormItem className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-gradient-to-r from-card/30 to-card/10 backdrop-blur-sm">
                    <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground m-0">
                      <Smile className="w-4 h-4 text-accent" />
                      Add Emojis
                    </FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!my-0"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>          <Button className="w-full rounded-xl bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg" type="submit" disabled={loading}>            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Bio
              </>
            )}
          </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
