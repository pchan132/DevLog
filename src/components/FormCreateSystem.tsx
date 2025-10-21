"use client";
// From CREATE and EDIT system

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormCreateSystemProps {
  projectId?: string;
  systemId?: string;
  onSuccess?: () => void;
  isEdit?: boolean;
  initialData?: {
    title: string;
    description: string;
    status: string;
  };
}

interface FormErrors {
  title?: string;
  description?: string;
  general?: string;
}

export default function FormCreateSystem({
  projectId,
  systemId,
  onSuccess,
  isEdit = false,
  initialData,
}: FormCreateSystemProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ให้ตรวจว่ามีข้อมูลมาไหม
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
    }
  }, [initialData]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = "กรุณาระบุชื่อระบบ/ฟิเจอร์";
    } else if (title.trim().length < 2) {
      newErrors.title = "ชื่อระบบ/ฟิเจอร์ต้องมีอย่างน้อย 2 ตัวอักษร";
    } else if (title.trim().length > 100) {
      newErrors.title = "ชื่อระบบ/ฟิเจอร์ต้องไม่เกิน 100 ตัวอักษร";
    }

    // Description validation
    if (description && description.trim().length > 500) {
      newErrors.description = "คำอธิบายต้องไม่เกิน 500 ตัวอักษร";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // เมื่อกด Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // เมื่อไม่เจอ projectId
    if (!projectId) {
      setErrors({ general: "ไม่พบ projectId กรุณาเริ่มจากหน้าโปรเจค" });
      return;
    }

    // Prevent double submission
    if (isSubmitting || loading) {
      return;
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setIsSubmitting(true);
    setErrors({});

    try {
      const url = isEdit ? `/api/systems/${systemId}` : "/api/systems";
      // ถ้า isEdit == true ให้เป็น PUT
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          status,
          projectId,
        }),
      });

      if (response.ok) {
        // เคลียร์ฟอร์มเฉพาะกรณีสร้างใหม่
        if (!isEdit) {
          setTitle("");
          setDescription("");
          setStatus("TODO");
        }

        // เรียก callback ถ้ามี
        if (onSuccess) {
          onSuccess();
        } else {
          // รีเฟรชหน้าเพียงครั้งเดียว
          router.refresh();
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrors({
          general:
            errorData.message ||
            `ไม่สามารถ${isEdit ? "อัปเดต" : "สร้าง"}ระบบได้`,
        });
      }
    } catch (error) {
      setErrors({
        general: `เกิดข้อผิดพลาด: ${
          error instanceof Error ? error.message : "ไม่สามารถบันทึกระบบได้"
        }`,
      });
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Clear specific error when user starts typing
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {errors.general}
        </div>
      )}

      {/* Title Field */}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          ชื่อระบบ/ฟิเจอร์ <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="ระบุชื่อระบบหรือฟีเจอร์"
          className={cn(
            errors.title && "border-red-500 focus-visible:ring-red-500"
          )}
          disabled={loading}
          maxLength={100}
          required
        />
        {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        <p className="text-xs text-gray-500">{title.length}/100 ตัวอักษร</p>
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          คำอธิบาย
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="ระบุคำอธิบายเกี่ยวกับระบบหรือฟีเจอร์นี้ (ไม่จำเป็น)"
          className={cn(
            "w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            errors.description && "border-red-500 focus:ring-red-500"
          )}
          rows={4}
          maxLength={500}
          disabled={loading}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500">
          {description.length}/500 ตัวอักษร
        </p>
      </div>

      {/* Status Field */}
      <div className="space-y-2">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          สถานะ
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className={cn(
            "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white"
          )}
          disabled={loading}
        >
          <option value="TODO" className="bg-black text-white">
            📝 TODO - ยังไม่ได้ทำ
          </option>
          <option value="DOING" className="bg-black text-white">
            🔄 DOING - กำลังทำ
          </option>
          <option value="DONE" className="bg-black text-white">
            ✅ DONE - สำเร็จ
          </option>
        </select>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        disabled={loading || isSubmitting}
      >
        {loading || isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            กำลังบันทึก...
          </>
        ) : isEdit ? (
          "อัปเดตระบบ"
        ) : (
          "สร้างระบบ"
        )}
      </Button>
    </form>
  );
}
