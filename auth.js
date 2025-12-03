// auth.js
// يعتمد على supabase-js ESM من CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// ===== استبدل القيم محليًا فقط =====
const SUPABASE_URL = 'REPLACE_WITH_SUPABASE_URL'      // مثال: https://abcd1234.supabase.co
const SUPABASE_ANON_KEY = 'REPLACE_WITH_SUPABASE_ANON_KEY'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ------------------- دوال أساسية -------------------
export async function registerUser(payload) {
  const { email, password, ...profile } = payload

  const { data: signData, error: signErr } = await supabase.auth.signUp({
    email,
    password
  })
  if (signErr) throw signErr

  // user id من auth
  let userId = signData?.user?.id
  if (!userId) {
    const u = (await supabase.auth.getUser()).data?.user
    userId = u?.id
  }
  if (!userId) throw new Error('لم يسترجع id المستخدم — تأكد من التسجيل')

  const { error: dbErr } = await supabase
    .from('profiles')
    .insert([{ id: userId, email, ...profile }])

  if (dbErr) throw dbErr
  return { ok: true }
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function uploadFile(file, userId) {
  if (!file) throw new Error('لا يوجد ملف')
  const filePath = `${userId}/${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filePath, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { publicURL, error: urlErr } = supabase.storage.from('uploads').getPublicUrl(filePath)
  if (urlErr) throw urlErr

  // خزّن في profiles كمثال (ستعدل الحقل حسب حاجتك)
  await supabase.from('profiles').upsert({ id: userId, file_url: publicURL }, { onConflict: 'id' })
  return publicURL
}

export async function getProfile(userId) {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error) throw error
  return data
}

// ------------------- ربط الفورمات تلقائياً -------------------
document.addEventListener('DOMContentLoaded', () => {
  // تسجيل
  const reg = document.getElementById('registerForm')
  if (reg) {
    reg.addEventListener('submit', async (e) => {
      e.preventDefault()
      try {
        const fd = new FormData(e.target)
        const payload = {
          email: (fd.get('email') || '').trim(),
          password: fd.get('password'),
          first_name: fd.get('first_name') || '',
          second_name: fd.get('second_name') || '',
          grade: fd.get('grade') || '',
          mobile: fd.get('mobile') || '',
          parent_mobile: fd.get('parent_mobile') || '',
          is_azhari: fd.get('is_azhari') === 'on'
        }
        await registerUser(payload)
        alert('تم التسجيل! يمكنك الآن تسجيل الدخول.')
        location.href = '/login.html'
      } catch (err) {
        console.error(err)
        alert('خطأ في التسجيل: ' + (err.message || JSON.stringify(err)))
      }
    })
  }

  // تسجيل دخول
  const login = document.getElementById('loginForm')
  if (login) {
    login.addEventListener('submit', async (e) => {
      e.preventDefault()
      try {
        const fd = new FormData(e.target)
        const email = (fd.get('email') || '').trim()
        const password = fd.get('password')
        await loginUser(email, password)
        alert('تم تسجيل الدخول')
        location.href = '/index.html'
      } catch (err) {
        console.error(err)
        alert('خطأ في تسجيل الدخول: ' + (err.message || JSON.stringify(err)))
      }
    })
  }

  // رفع ملف
  const uploadForm = document.getElementById('uploadForm')
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      try {
        const input = uploadForm.querySelector('input[type=file]')
        const file = input.files[0]
        if (!file) return alert('اختار ملف للرفع')
        const user = (await supabase.auth.getUser()).data.user
        if (!user) return alert('يجب تسجيل الدخول أولاً')
        const url = await uploadFile(file, user.id)
        alert('تم رفع الملف بنجاح:\n' + url)
      } catch (err) {
        console.error(err)
        alert('خطأ في الرفع: ' + (err.message || JSON.stringify(err)))
      }
    })
  }
})
