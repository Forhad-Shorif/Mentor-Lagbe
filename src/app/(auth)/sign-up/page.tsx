import { SignUpForm } from "@/components/AuthSheare/Sign-Up";
import React from "react";

// হিন্ট (কী): SignUpForm-কে পরিষ্কার থিম-সমন্বিত পেজ র‍্যাপারে রেন্ডার করা হচ্ছে।
// হিন্ট (কেন): ভেতরের SignUpForm-এর নিজস্ব light/dark থিম ও split লেআউট যেন ঠিকভাবে কাজ করে।
// হিন্ট (কীভাবে): বাড়তি dark wrapper বাদ দিয়ে সরাসরি <SignUpForm /> রেন্ডার করা হয়েছে।
const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;