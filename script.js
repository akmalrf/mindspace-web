(function () {
      'use strict';

      // -------------------- SAFE STORAGE --------------------
      const STORAGE_KEY = 'mindspace_app_state_v1';
      function loadStorage() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          return raw ? JSON.parse(raw) : null;
        } catch (e) {
          return null;
        }
      }
      function saveStorage(data) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          // Ignore storage quota or sandbox restriction errors
        }
      }

      // -------------------- DEFAULT SEED DATA --------------------
      const todayISO = new Date().toISOString().slice(0, 10);
      function offsetDate(days) {
        const d = new Date();
        d.setDate(d.getDate() + days);
        return d.toISOString().slice(0, 10);
      }

      const DEFAULT_ARTICLES = [
        {
          id: 'art-1',
          category: 'Stres Akademik',
          title: 'Mengelola Stres Skripsi dan Deadline Tanpa Mengorbankan Tidur',
          summary: 'Strategi membagi target tugas besar menjadi langkah kecil yang realistis bagi mahasiswa.',
          readTime: '4 menit baca',
          color: 'from-sky-100 to-pastel-200',
          icon: 'book-open',
          content: [
            'Banyak mahasiswa merasa kewalahan bukan karena tugasnya mustahil, melainkan karena melihat keseluruhan skripsi atau proyek sebagai satu gunung raksasa.',
            'Cobalah teknik micro-chunking: pecah satu bab menjadi tugas 25–45 menit, misalnya "mencari 3 referensi jurnal" atau "menulis 1 paragraf latar belakang".',
            'Lindungi jam tidur minimal 7 jam. Otak yang kurang tidur mengalami penurunan fungsi eksekutif sehingga tugas terasa dua kali lebih berat keesokan harinya.'
          ]
        },
        {
          id: 'art-2',
          category: 'Kecemasan',
          title: 'Mengenali Overthinking dan Cara Menenangkan Pikiran yang Berisik',
          summary: 'Bedakan antara refleksi yang membangun dengan lingkaran kekhawatiran yang melelahkan.',
          readTime: '5 menit baca',
          color: 'from-indigo-100 to-pastel-200',
          icon: 'cloud-rain',
          content: [
            'Overthinking sering muncul saat malam hari ketika distraksi berkurang dan otak mencoba mengantisipasi semua skenario terburuk.',
            'Gunakan teknik "Worry Time": sediakan 15 menit di sore hari untuk menuliskan semua kekhawatiran di kertas, lalu tutup buku tersebut saat waktu habis.',
            'Jika kecemasan muncul mendadak, kembalikan fokus ke tubuh melalui teknik grounding 5-4-3-2-1 yang tersedia di Self-Care Corner.'
          ]
        },
        {
          id: 'art-3',
          category: 'Burnout',
          title: 'Tanda-Tanda Kelelahan Emosional (Burnout) pada Mahasiswa Aktif',
          summary: 'Kenali sinyal tubuh dan emosi sebelum kelelahan berubah menjadi kehilangan motivasi total.',
          readTime: '4 menit baca',
          color: 'from-purple-100 to-pastel-100',
          icon: 'battery-low',
          content: [
            'Burnout bukan sekadar rasa malas. Ciri utamanya meliputi kelelahan fisik meski sudah tidur, sinisme terhadap kuliah/organisasi, dan merasa tidak pernah cukup baik.',
            'Langkah pemulihan pertama adalah memberi izin pada diri sendiri untuk beristirahat tanpa rasa bersalah.',
            'Kurangi beban non-esensial sementara waktu dan bicarakan kondisi Anda dengan teman tepercaya atau konselor kampus.'
          ]
        },
        {
          id: 'art-4',
          category: 'Kesehatan Mental',
          title: 'Kapan Sebaiknya Menghubungi Psikolog atau Konselor Profesional?',
          summary: 'Panduan sederhana memahami kapan dukungan mandiri perlu dilengkapi bantuan ahli.',
          readTime: '3 menit baca',
          color: 'from-emerald-100 to-pastel-100',
          icon: 'heart-handshake',
          content: [
            'Anda tidak harus menunggu kondisi menjadi sangat parah untuk berkonsultasi dengan psikolog.',
            'Pertimbangkan mencari bantuan profesional jika perasaan sedih, cemas, atau hampa berlangsung lebih dari 2 minggu berturut-turut dan mengganggu kuliah, tidur, atau relasi.',
            'Di Indonesia, Anda juga bisa mengakses layanan dukungan psikologis awal Kemenkes RI melalui Healing119.id atau telepon 119 ext. 8.'
          ]
        }
      ];

      const DEFAULT_VIDEOS = [
        { id: 'vid-1', title: 'Teknik Napas 4-7-8 untuk Meredakan Cemas Sebelum Presentasi', duration: '03:45', topic: 'Relaksasi', desc: 'Panduan visual singkat mengatur ritme napas agar detak jantung kembali tenang.' },
        { id: 'vid-2', title: 'Mengatasi Imposter Syndrome di Lingkungan Kampus', duration: '06:20', topic: 'Kesehatan Mental', desc: 'Mengapa banyak mahasiswa berprestasi tetap merasa tidak layak, dan cara menyikapinya.' }
      ];

      const DEFAULT_WEBINARS = [
        { id: 'web-1', title: 'Surviving Semester Akhir: Jaga Kewarasan Saat Skripsi', speaker: 'Contoh Narasumber Psikolog (Simulasi)', date: 'Sabtu, 28 Nov 2026 • 10:00 WIB', quota: 'Gratis • Online Zoom' },
        { id: 'web-2', title: 'Self-Compassion untuk Generasi Muda yang Sering Membandingkan Diri', speaker: 'Contoh Narasumber Konselor (Simulasi)', date: 'Minggu, 6 Des 2026 • 15:30 WIB', quota: 'Gratis • Online Zoom' }
      ];

      const PLACEHOLDER_PSYCHOLOGISTS = [
        {
          id: 'psy-1',
          name: 'Contoh Profil Konselor A (Placeholder)',
          role: 'Contoh Kualifikasi: Psikolog Klinis Dewasa Muda',
          focus: 'Stres Akademik, Kecemasan, & Transisi Karir',
          schedule: 'Senin & Rabu • 10:00 – 16:00 WIB',
          mode: 'Online Video / Chat'
        },
        {
          id: 'psy-2',
          name: 'Contoh Profil Konselor B (Placeholder)',
          role: 'Contoh Kualifikasi: Psikolog Pendidikan & Konseling',
          focus: 'Burnout Mahasiswa, Motivasi Belajar, & Relasi',
          schedule: 'Selasa & Jumat • 13:30 – 19:00 WIB',
          mode: 'Online Video / Chat'
        }
      ];

      const REFLECTION_PROMPTS = [
        'Apa satu hal kecil hari ini yang membuatmu sedikit tersenyum atau lega?',
        'Jika sahabatmu berada di posisimu hari ini, kalimat lembut apa yang akan kamu katakan padanya?',
        'Beban pikiran apa yang sebenarnya berada di luar kendalimu dan boleh kamu lepaskan malam ini?',
        'Apa bentuk istirahat paling sederhana yang dibutuhkan tubuhmu dalam 24 jam ke depan?'
      ];

      const GROUNDING_STEPS = [
        { id: 'g5', label: '5 hal yang bisa kamu LIHAT di sekitarmu sekarang' },
        { id: 'g4', label: '4 hal yang bisa kamu SENTUH (meja, baju, bantal)' },
        { id: 'g3', label: '3 suara yang bisa kamu DENGAR saat ini' },
        { id: 'g2', label: '2 aroma yang bisa kamu CIUM di ruangan' },
        { id: 'g1', label: '1 hal baik yang kamu rasakan atau syukuri hari ini' }
      ];

      const DEFAULT_STORIES = [
        {
          id: 'st-1',
          category: 'Akademik',
          content: 'Semester ini rasanya berat banget karena revisi skripsi bolak-balik dan teman-teman sudah mulai sidang. Kadang aku nangis diam-diam di kos, tapi hari ini aku belajar buat tetap menghargai progres kecilku.',
          time: '2 jam lalu',
          hugs: 14,
          hugged: false,
          comments: [
            { id: 'c-1', text: 'Peluk jauh! Progres tiap orang beda-beda, kamu sudah bertahan sejauh ini dan itu hebat.', time: '1 jam lalu' }
          ]
        },
        {
          id: 'st-2',
          category: 'Kehidupan Pribadi',
          content: 'Aku sering merasa bersalah kalau istirahat karena takut dianggap malas. Ternyata setelah berani matiin notifikasi HP jam 9 malam, tidurku jauh lebih nyenyak.',
          time: '5 jam lalu',
          hugs: 21,
          hugged: false,
          comments: []
        },
        {
          id: 'st-3',
          category: 'Pertemanan',
          content: 'Merasa kesepian di tengah keramaian kampus itu ternyata nyata ya. Semoga teman-teman di sini yang lagi ngerasain hal sama bisa nemu ruang aman buat bernapas.',
          time: '1 hari lalu',
          hugs: 18,
          hugged: false,
          comments: []
        }
      ];

      const initialSeedState = {
        currentUser: null,
        users: [
          {
            id: 'u-demo',
            name: 'Mahasiswa Demo',
            email: 'demo@mindspace.id',
            password: 'mindspace123',
            status: 'Mahasiswa Semester 5'
          }
        ],
        preferences: {
          anonDefault: true,
          privateMood: true,
          notifMood: true,
          notifWebinar: true
        },
        stories: DEFAULT_STORIES,
        moderationQueue: [],
        reportedStoryIds: [],
        registeredWebinars: [],
        consultations: [],
        moodLogsByUser: {
          guest: [
            { id: 'm-1', date: offsetDate(-3), score: 3, label: 'Biasa', emoji: '😐', note: 'Tugas mulai menumpuk tapi masih terkendali.' },
            { id: 'm-2', date: offsetDate(-2), score: 2, label: 'Lelah', emoji: '😔', note: 'Kurang tidur karena rapat organisasi.' },
            { id: 'm-3', date: offsetDate(-1), score: 4, label: 'Baik', emoji: '🙂', note: 'Sudah sempat jalan sore dan lebih tenang.' }
          ],
          'u-demo': [
            { id: 'md-1', date: offsetDate(-4), score: 2, label: 'Lelah', emoji: '😔', note: 'Overwhelmed dengan 3 deadline minggu ini.' },
            { id: 'md-2', date: offsetDate(-2), score: 4, label: 'Baik', emoji: '🙂', note: 'Selesai bimbingan dan dapat masukan jelas.' },
            { id: 'md-3', date: offsetDate(-1), score: 5, label: 'Sangat Baik', emoji: '😄', note: 'Tidur cukup dan ngobrol hangat sama teman.' }
          ]
        },
        journalsByUser: {
          guest: [
            { id: 'j-1', title: 'Terima kasih untuk hari ini', body: 'Meskipun capek, aku berhasil menyelesaikan satu bab bacaan.', date: offsetDate(-1) }
          ],
          'u-demo': [
            { id: 'jd-1', title: 'Hal kecil yang kusyukuri', body: 'Kopi hangat pagi ini dan cuaca cerah sebelum kelas.', date: offsetDate(-1) }
          ]
        },
        groundingChecked: {},
        reflectionIndex: 0
      };

      let state = loadStorage() || JSON.parse(JSON.stringify(initialSeedState));
      let activeView = 'home';
      let storyFilter = 'Semua';
      let articleFilter = 'Semua';
      let selectedMood = { score: 4, label: 'Baik', emoji: '🙂' };
      let moodChartInstance = null;
      let breathInterval = null;
      let breathRunning = false;

      const chatHistory = [
        {
          sender: 'ai',
          text: 'Hai! Aku Awan, AI Buddy di MindSpace. ☁️ Aku di sini untuk mendengarkan ceritamu tanpa menghakimi. Apa yang sedang kamu rasakan hari ini?',
          time: getTimeStr(),
          isCrisis: false
        }
      ];

      function persist() {
        saveStorage(state);
      }

      function getTimeStr() {
        const now = new Date();
        return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      }

      function getActiveUserKey() {
        return state.currentUser ? state.currentUser.id : 'guest';
      }

      function escapeHTML(str) {
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      // -------------------- TOAST & MODAL --------------------
      function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div');
        const colors = type === 'error'
          ? 'bg-rose-600 text-white'
          : type === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-pastel-800 text-white';
        el.className = `pointer-events-auto px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium shadow-lg ${colors} fade-in max-w-xs`;
        el.textContent = message;
        container.appendChild(el);
        setTimeout(() => {
          el.remove();
        }, 3200);
      }

      function openModal(title, bodyHTML, footerButtons = []) {
        const modal = document.getElementById('app-modal');
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-body').innerHTML = bodyHTML;
        const footer = document.getElementById('modal-footer');
        footer.innerHTML = '';
        footerButtons.forEach((btn) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.className = btn.className || 'px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-semibold';
          b.textContent = btn.label;
          b.addEventListener('click', () => {
            if (btn.onClick) btn.onClick();
            if (btn.close !== false) closeModal();
          });
          footer.appendChild(b);
        });
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        if (window.lucide) lucide.createIcons();
      }

      function closeModal() {
        const modal = document.getElementById('app-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }

      document.getElementById('modal-close').addEventListener('click', closeModal);
      document.getElementById('app-modal').addEventListener('click', (e) => {
        if (e.target.id === 'app-modal') closeModal();
      });

      // -------------------- NAVIGATION --------------------
      function navigateTo(view) {
        activeView = view;
        document.querySelectorAll('.page-view').forEach((sec) => {
          sec.classList.add('hidden');
        });
        const target = document.getElementById(`view-${view}`);
        if (target) target.classList.remove('hidden');

        document.querySelectorAll('.nav-btn').forEach((btn) => {
          const isActive = btn.dataset.nav === view;
          btn.className = isActive
            ? 'nav-btn px-3 py-2 rounded-xl text-sm font-semibold bg-pastel-100 text-pastel-700 transition-colors'
            : 'nav-btn px-3 py-2 rounded-xl text-sm font-medium text-pastel-700/80 hover:bg-pastel-50 hover:text-pastel-800 transition-colors';
        });

        document.getElementById('mobile-menu').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (view === 'mood') renderMoodSection();
        if (view === 'stories') renderStoriesSection();
        if (view === 'psychology') renderPsychologySection();
        if (view === 'consultation') renderConsultationSection();
        if (view === 'self-care') renderSelfCareSection();
        if (view === 'profile') renderProfileSection();
        if (view !== 'self-care' && breathRunning) resetBreathing();
      }

      document.body.addEventListener('click', (e) => {
        const navTarget = e.target.closest('[data-nav]');
        if (navTarget) {
          navigateTo(navTarget.dataset.nav);
        }
      });

      document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
      });

      document.getElementById('btn-explore-mindspace').addEventListener('click', () => {
        const el = document.getElementById('home-features-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });

      // -------------------- HEADER USER SYNC --------------------
      function syncHeaderUser() {
        const nameEl = document.getElementById('header-user-name');
        const dotEl = document.getElementById('header-avatar-dot');
        if (state.currentUser) {
          nameEl.textContent = state.currentUser.name;
          dotEl.textContent = state.currentUser.name.charAt(0).toUpperCase();
        } else {
          nameEl.textContent = 'Masuk';
          dotEl.textContent = 'M';
        }
      }

      // -------------------- 2. AI BUDDY (GEMINI + FALLBACK) --------------------
      const GEMINI_KEY_STORAGE = 'mindspace_gemini_config_v1';
      function loadGeminiConfig() {
        try {
          const raw = localStorage.getItem(GEMINI_KEY_STORAGE);
          return raw ? JSON.parse(raw) : { apiKey: '', model: 'gemini-2.5-flash' };
        } catch (e) {
          return { apiKey: '', model: 'gemini-2.5-flash' };
        }
      }
      function saveGeminiConfig(cfg) {
        try {
          localStorage.setItem(GEMINI_KEY_STORAGE, JSON.stringify(cfg));
        } catch (e) {}
      }

      let geminiConfig = loadGeminiConfig();
      let isAITyping = false;

      function syncGeminiUI() {
        const badge = document.getElementById('ai-mode-badge');
        const pill = document.getElementById('gemini-status-pill');
        const statusEl = document.getElementById('ai-chat-status');
        const keyInput = document.getElementById('gemini-api-key-input');
        const modelSel = document.getElementById('gemini-model-select');
        const discBtn = document.getElementById('btn-gemini-disconnect');

        if (modelSel && geminiConfig.model) modelSel.value = geminiConfig.model;
        if (keyInput) keyInput.value = geminiConfig.apiKey || '';

        if (geminiConfig.apiKey) {
          badge.textContent = `Gemini AI Aktif (${geminiConfig.model})`;
          badge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-semibold';
          pill.textContent = 'Terhubung ✓';
          pill.className = 'px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700';
          statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Terhubung ke ${escapeHTML(geminiConfig.model)}`;
          discBtn.classList.remove('hidden');
        } else {
          badge.textContent = 'Mode Simulasi';
          badge.className = 'px-2.5 py-0.5 rounded-full bg-pastel-200 text-pastel-700 text-[11px] font-semibold';
          pill.textContent = 'Belum Terhubung';
          pill.className = 'px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800';
          statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Mode Simulasi (Masukkan API Key untuk Gemini)';
          discBtn.classList.add('hidden');
        }
      }

      function formatChatText(str) {
        return escapeHTML(str)
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br>');
      }

      function renderChat() {
        const box = document.getElementById('chat-messages');
        box.innerHTML = '';
        chatHistory.forEach((msg) => {
          const wrapper = document.createElement('div');
          wrapper.className = msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start items-end gap-2';
          if (msg.sender === 'ai') {
            wrapper.innerHTML = `
              <div class="w-8 h-8 rounded-full bg-pastel-200 flex items-center justify-center text-sm shrink-0">☁️</div>
              <div class="max-w-[82%] space-y-2">
                <div class="px-4 py-3 rounded-2xl rounded-bl-sm bg-white border border-pastel-200 text-sm text-pastel-800 shadow-xs leading-relaxed">
                  ${formatChatText(msg.text)}
                </div>
                ${msg.isCrisis ? `
                  <div class="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1.5">
                    <p class="font-bold">Kamu tidak sendirian. Bantuan profesional siap mendampingi:</p>
                    <p>• <strong>Healing119.id (Kemenkes RI):</strong> Hubungi <strong>119 ext. 8</strong> atau <strong>healing119.id</strong> (24 jam)</p>
                    <p>• <strong>Darurat Medis:</strong> Telepon <strong>119</strong> atau menuju IGD RS/Puskesmas terdekat</p>
                  </div>
                ` : ''}
                <span class="block text-[10px] text-pastel-500 pl-1">${msg.time}${msg.viaGemini ? ' • Gemini AI' : ''}</span>
              </div>
            `;
          } else {
            wrapper.innerHTML = `
              <div class="max-w-[80%] space-y-1 text-right">
                <div class="px-4 py-3 rounded-2xl rounded-br-sm bg-pastel-500 text-white text-sm shadow-xs leading-relaxed text-left">
                  ${escapeHTML(msg.text)}
                </div>
                <span class="block text-[10px] text-pastel-500 pr-1">${msg.time}</span>
              </div>
            `;
          }
          box.appendChild(wrapper);
        });

        if (isAITyping) {
          const typing = document.createElement('div');
          typing.className = 'flex justify-start items-end gap-2';
          typing.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-pastel-200 flex items-center justify-center text-sm shrink-0">☁️</div>
            <div class="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-pastel-200 text-xs text-pastel-600 italic">
              Awan sedang mengetik...
            </div>
          `;
          box.appendChild(typing);
        }

        box.scrollTop = box.scrollHeight;
      }

      function generateAIResponse(input) {
        const lower = input.toLowerCase();
        const crisisWords = ['bunuh diri', 'menyakiti diri', 'mati saja', 'akhiri hidup', 'self harm', 'putus asa banget'];
        if (crisisWords.some((w) => lower.includes(w))) {
          return {
            text: 'Terima kasih sudah berani mengungkapkan apa yang kamu rasakan. Perasaanmu sangat berat saat ini, dan keselamatanmu adalah hal yang paling penting. Aku sangat menyarankan kamu segera berbicara dengan tenaga profesional atau orang tepercaya di dekatmu.',
            isCrisis: true
          };
        }
        if (lower.includes('skripsi') || lower.includes('tugas') || lower.includes('kuliah') || lower.includes('ujian') || lower.includes('akademik')) {
          return {
            text: 'Wajar sekali merasa tertekan dengan tugas kuliah atau skripsi. Coba ambil jeda 5 menit, minum air putih, lalu pilih satu langkah terkecil saja untuk dikerjakan hari ini. Kamu tidak harus menyelesaikan semuanya malam ini, ya.',
            isCrisis: false
          };
        }
        if (lower.includes('cemas') || lower.includes('overthinking') || lower.includes('takut') || lower.includes('panik')) {
          return {
            text: 'Pikiran yang terus berputar memang sangat melelahkan. Aku di sini menemanimu. Coba taruh satu tangan di dada dan tarik napas perlahan 4 detik. Mau coba latihan napas di Self-Care Corner atau cerita lebih lanjut tentang apa yang paling kamu khawatirkan?',
            isCrisis: false
          };
        }
        if (lower.includes('burnout') || lower.includes('capek') || lower.includes('lelah')) {
          return {
            text: 'Kedengarannya energimu sedang terkuras habis. Kelelahan emosional itu valid dan bukan tanda kelemahan. Hari ini, izinkan dirimu beristirahat sejenak tanpa rasa bersalah.',
            isCrisis: false
          };
        }
        if (lower.includes('teman') || lower.includes('keluarga') || lower.includes('pacar') || lower.includes('kesepian')) {
          return {
            text: 'Masalah dengan orang-orang terdekat memang sering menguras hati. Perasaan kecewa atau kesepianmu sangat wajar. Kalau kamu nyaman, ceritakan bagian mana yang paling mengganjal pikiranmu saat ini.',
            isCrisis: false
          };
        }
        return {
          text: 'Terima kasih sudah berbagi cerita denganku. Aku mendengarkanmu, dan apa yang kamu rasakan itu valid. Pelan-pelan saja ya—kalau kamu ingin menuliskan lebih detail atau sekadar meluapkan isi hati, aku siap menyimak.',
          isCrisis: false
        };
      }

      async function callGeminiAPI(historyItems) {
        const model = geminiConfig.model || 'gemini-2.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiConfig.apiKey)}`;
        const contents = historyItems.slice(-12).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

        const payload = {
          systemInstruction: {
            parts: [{
              text: 'Kamu adalah Awan, AI Buddy yang hangat, empatik, dan tidak menghakimi di platform MindSpace (Safe Place for Tired Minds) untuk mahasiswa dan generasi muda di Indonesia. Gunakan bahasa Indonesia yang natural, lembut, mudah dipahami, dan suportif (2-4 kalimat atau poin singkat). Kamu hanya memberikan dukungan emosional awal dan informasi umum—bukan diagnosis medis atau pengganti psikolog. Jika pengguna menunjukkan tanda krisis, keinginan menyakiti diri, atau bahaya, tunjukkan empati tinggi dan sarankan segera menghubungi Healing119.id (119 ext. 8) atau layanan darurat medis 119.'
            }]
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
          }
        };

        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) {
          const errMsg = data?.error?.message || `HTTP ${res.status}`;
          throw new Error(errMsg);
        }
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!replyText) throw new Error('Respons Gemini kosong.');
        return replyText.trim();
      }

      async function sendChatMessage(text) {
        const clean = text.trim();
        if (!clean || isAITyping) return;

        const lower = clean.toLowerCase();
        const crisisWords = ['bunuh diri', 'menyakiti diri', 'mati saja', 'akhiri hidup', 'self harm', 'putus asa banget'];
        const isCrisis = crisisWords.some((w) => lower.includes(w));

        chatHistory.push({ sender: 'user', text: clean, time: getTimeStr(), isCrisis: false });
        document.getElementById('chat-input').value = '';

        if (geminiConfig.apiKey) {
          isAITyping = true;
          renderChat();
          try {
            const geminiText = await callGeminiAPI(chatHistory);
            isAITyping = false;
            chatHistory.push({ sender: 'ai', text: geminiText, time: getTimeStr(), isCrisis, viaGemini: true });
            renderChat();
          } catch (err) {
            isAITyping = false;
            showToast(`Gemini API gagal (${err.message}). Menggunakan respons fallback lokal.`, 'error');
            const fallback = generateAIResponse(clean);
            chatHistory.push({ sender: 'ai', text: fallback.text, time: getTimeStr(), isCrisis: fallback.isCrisis || isCrisis });
            renderChat();
          }
        } else {
          isAITyping = true;
          renderChat();
          setTimeout(() => {
            isAITyping = false;
            const reply = generateAIResponse(clean);
            chatHistory.push({ sender: 'ai', text: reply.text, time: getTimeStr(), isCrisis: reply.isCrisis });
            renderChat();
          }, 450);
        }
      }

      document.getElementById('gemini-quick-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const key = document.getElementById('gemini-api-key-input').value.trim();
        const model = document.getElementById('gemini-model-select').value;
        if (!key) {
          showToast('Masukkan Gemini API Key terlebih dahulu.', 'error');
          return;
        }
        geminiConfig = { apiKey: key, model };
        saveGeminiConfig(geminiConfig);
        syncGeminiUI();
        showToast(`Terhubung ke Gemini (${model})!`, 'success');
      });

      document.getElementById('btn-gemini-disconnect').addEventListener('click', () => {
        geminiConfig = { apiKey: '', model: geminiConfig.model || 'gemini-2.5-flash' };
        saveGeminiConfig(geminiConfig);
        syncGeminiUI();
        showToast('API Key dihapus. Kembali ke mode simulasi.');
      });

      document.getElementById('btn-gemini-settings').addEventListener('click', () => {
        openModal(
          'Pengaturan Gemini API',
          `
            <p class="text-xs text-pastel-700">Untuk menghubungkan AI Buddy dengan Google Gemini secara langsung dari browser, masukkan API Key dari <strong>Google AI Studio</strong>. Key hanya disimpan di perangkat Anda.</p>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-semibold text-pastel-700 mb-1">Gemini API Key</label>
                <input type="password" id="modal-gemini-key" value="${escapeHTML(geminiConfig.apiKey || '')}" placeholder="AIza..." class="w-full px-3.5 py-2.5 rounded-xl bg-pastel-50 border border-pastel-200 text-sm focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-pastel-700 mb-1">Model Gemini</label>
                <select id="modal-gemini-model" class="w-full px-3.5 py-2.5 rounded-xl bg-pastel-50 border border-pastel-200 text-sm focus:outline-none">
                  <option value="gemini-2.5-flash" ${geminiConfig.model === 'gemini-2.5-flash' ? 'selected' : ''}>gemini-2.5-flash (Cepat &amp; Responsif)</option>
                  <option value="gemini-2.5-pro" ${geminiConfig.model === 'gemini-2.5-pro' ? 'selected' : ''}>gemini-2.5-pro</option>
                  <option value="gemini-2.0-flash" ${geminiConfig.model === 'gemini-2.0-flash' ? 'selected' : ''}>gemini-2.0-flash</option>
                </select>
              </div>
            </div>
          `,
          [
            {
              label: 'Hapus Key',
              className: 'px-4 py-2 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold',
              onClick: () => {
                geminiConfig = { apiKey: '', model: 'gemini-2.5-flash' };
                saveGeminiConfig(geminiConfig);
                syncGeminiUI();
                showToast('Gemini API Key dihapus.');
              }
            },
            {
              label: 'Simpan & Hubungkan',
              className: 'px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-semibold',
              onClick: () => {
                const k = document.getElementById('modal-gemini-key').value.trim();
                const m = document.getElementById('modal-gemini-model').value;
                geminiConfig = { apiKey: k, model: m };
                saveGeminiConfig(geminiConfig);
                syncGeminiUI();
                showToast(k ? `Terhubung ke ${m}!` : 'API Key dikosongkan (Mode Simulasi).', k ? 'success' : 'info');
              }
            }
          ]
        );
      });

      document.getElementById('chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        sendChatMessage(document.getElementById('chat-input').value);
      });

      document.querySelectorAll('.topic-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          sendChatMessage(chip.dataset.topic);
        });
      });

      document.getElementById('btn-reset-chat').addEventListener('click', () => {
        chatHistory.length = 1;
        renderChat();
        showToast('Percakapan AI Buddy dimulai ulang.');
      });

      document.getElementById('btn-open-emergency').addEventListener('click', () => {
        openModal(
          'Layanan Bantuan Profesional & Darurat (Indonesia)',
          `
            <p>Jika Anda atau orang terdekat mengalami krisis emosional berat atau kondisi yang mengancam keselamatan, segera hubungi layanan resmi berikut:</p>
            <div class="space-y-2.5">
              <div class="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                <p class="font-bold text-rose-800">Healing119.id (Kementerian Kesehatan RI)</p>
                <p class="text-xs text-rose-900 mt-0.5">Telepon <strong>119 ext. 8</strong> atau akses layanan chat daring 24 jam melalui situs <strong>healing119.id</strong>.</p>
              </div>
              <div class="p-3.5 rounded-2xl bg-pastel-50 border border-pastel-200">
                <p class="font-bold text-pastel-800">Layanan Darurat Medis Nasional 119</p>
                <p class="text-xs text-pastel-700 mt-0.5">Hubungi <strong>119</strong> untuk pertolongan kegawatdaruratan medis segera atau kunjungi IGD RS/Puskesmas terdekat.</p>
              </div>
            </div>
          `,
          [{ label: 'Tutup', className: 'px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-semibold' }]
        );
      });

      // -------------------- 3. ANONYMOUS STORY SHARING --------------------
      function renderStoriesSection() {
        const qBox = document.getElementById('moderation-queue-box');
        const qList = document.getElementById('moderation-queue-list');
        if (state.moderationQueue.length > 0) {
          qBox.classList.remove('hidden');
          qList.innerHTML = '';
          state.moderationQueue.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2';
            div.innerHTML = `
              <div class="flex items-center justify-between">
                <span class="font-semibold text-amber-900">Anonim • ${escapeHTML(item.category)}</span>
                <span class="text-[10px] text-amber-700">Menunggu Moderasi</span>
              </div>
              <p class="text-pastel-800">${escapeHTML(item.content)}</p>
              <button type="button" data-approve-story="${item.id}" class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold">
                Setujui Moderasi (Simulasi Demo)
              </button>
            `;
            qList.appendChild(div);
          });
        } else {
          qBox.classList.add('hidden');
        }

        const feed = document.getElementById('stories-feed');
        feed.innerHTML = '';
        const filtered = state.stories.filter((s) => {
          if (state.reportedStoryIds.includes(s.id)) return false;
          return storyFilter === 'Semua' || s.category === storyFilter;
        });

        if (filtered.length === 0) {
          feed.innerHTML = '<div class="soft-card rounded-3xl p-8 text-center text-sm text-pastel-600">Belum ada cerita pada kategori ini.</div>';
          return;
        }

        filtered.forEach((st) => {
          const card = document.createElement('article');
          card.className = 'soft-card rounded-3xl p-5 sm:p-6 space-y-4';
          const commentsHTML = st.comments.map((c) => `
            <div class="p-3 rounded-2xl bg-pastel-50 border border-pastel-100 text-xs space-y-1">
              <div class="flex justify-between text-[11px] text-pastel-500 font-medium">
                <span>Dukungan Anonim (Termoderasi)</span>
                <span>${escapeHTML(c.time)}</span>
              </div>
              <p class="text-pastel-800">${escapeHTML(c.text)}</p>
            </div>
          `).join('');

          card.innerHTML = `
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-pastel-100 text-pastel-600 flex items-center justify-center text-xs font-bold">?</span>
                <div>
                  <p class="text-xs font-bold text-pastel-800">Anonim</p>
                  <p class="text-[11px] text-pastel-500">${escapeHTML(st.time)}</p>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full bg-pastel-100 text-pastel-700 text-[11px] font-semibold">${escapeHTML(st.category)}</span>
            </div>
            <p class="text-sm text-pastel-800 leading-relaxed">${escapeHTML(st.content)}</p>
            <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-pastel-100">
              <button type="button" data-hug-story="${st.id}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${st.hugged ? 'bg-pastel-500 text-white' : 'bg-pastel-50 hover:bg-pastel-100 text-pastel-700'}">
                <span>🤍 Peluk Virtual</span>
                <span>(${st.hugs})</span>
              </button>
              <button type="button" data-report-story="${st.id}" class="px-3 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-1">
                <i data-lucide="flag" class="w-3.5 h-3.5"></i> Laporkan
              </button>
            </div>
            <div class="space-y-2">
              ${commentsHTML}
              <form data-comment-form="${st.id}" class="flex gap-2 pt-1">
                <input type="text" placeholder="Kirim komentar dukungan yang hangat..." class="flex-1 px-3.5 py-2 rounded-xl bg-pastel-50 border border-pastel-200 text-xs focus:outline-none" />
                <button type="submit" class="px-3.5 py-2 rounded-xl bg-pastel-500 hover:bg-pastel-600 text-white text-xs font-semibold">Kirim</button>
              </form>
            </div>
          `;
          feed.appendChild(card);
        });
        if (window.lucide) lucide.createIcons();
      }

      document.getElementById('story-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const cat = document.getElementById('story-category').value;
        const content = document.getElementById('story-content').value.trim();
        if (content.length < 15) {
          showToast('Tuliskan ceritamu minimal 15 karakter ya.', 'error');
          return;
        }
        const blocked = ['kasar', 'benci', 'bunuh'];
        if (blocked.some((w) => content.toLowerCase().includes(w))) {
          showToast('Cerita mengandung kata sensitif dan ditahan oleh filter moderasi otomatis.', 'error');
          return;
        }
        state.moderationQueue.unshift({
          id: 'mq-' + Date.now(),
          category: cat,
          content,
          time: 'Baru saja'
        });
        persist();
        document.getElementById('story-content').value = '';
        renderStoriesSection();
        showToast('Ceritamu masuk antrean moderasi anonim!', 'success');
      });

      document.getElementById('story-filter-bar').addEventListener('click', (e) => {
        const btn = e.target.closest('.story-filter-btn');
        if (!btn) return;
        storyFilter = btn.dataset.cat;
        document.querySelectorAll('.story-filter-btn').forEach((b) => {
          b.className = b.dataset.cat === storyFilter
            ? 'story-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-pastel-500 text-white'
            : 'story-filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-pastel-200 text-pastel-700';
        });
        renderStoriesSection();
      });

      document.getElementById('view-stories').addEventListener('click', (e) => {
        const approveBtn = e.target.closest('[data-approve-story]');
        if (approveBtn) {
          const id = approveBtn.dataset.approveStory;
          const idx = state.moderationQueue.findIndex((x) => x.id === id);
          if (idx !== -1) {
            const item = state.moderationQueue.splice(idx, 1)[0];
            state.stories.unshift({
              id: 'st-' + Date.now(),
              category: item.category,
              content: item.content,
              time: 'Baru saja',
              hugs: 1,
              hugged: false,
              comments: []
            });
            persist();
            renderStoriesSection();
            showToast('Cerita lolos moderasi dan tampil secara anonim.', 'success');
          }
          return;
        }

        const hugBtn = e.target.closest('[data-hug-story]');
        if (hugBtn) {
          const st = state.stories.find((s) => s.id === hugBtn.dataset.hugStory);
          if (st) {
            st.hugged = !st.hugged;
            st.hugs += st.hugged ? 1 : -1;
            persist();
            renderStoriesSection();
          }
          return;
        }

        const repBtn = e.target.closest('[data-report-story]');
        if (repBtn) {
          const sid = repBtn.dataset.reportStory;
          openModal(
            'Laporkan Konten Tidak Pantas',
            `
              <p class="text-xs">Pilih alasan pelaporan agar tim moderasi dapat meninjau cerita ini:</p>
              <select id="report-reason" class="w-full px-3.5 py-2.5 rounded-xl bg-pastel-50 border border-pastel-200 text-sm">
                <option value="Mengandung ujaran menyakiti diri">Mengandung ujaran menyakiti diri</option>
                <option value="Konten ofensif atau ujaran kebencian">Konten ofensif atau ujaran kebencian</option>
                <option value="Spam atau informasi pribadi terbuka">Spam atau informasi pribadi terbuka</option>
              </select>
            `,
            [
              { label: 'Batal', className: 'px-4 py-2 rounded-xl bg-pastel-100 text-pastel-700 text-xs font-semibold' },
              {
                label: 'Kirim Laporan',
                className: 'px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold',
                onClick: () => {
                  state.reportedStoryIds.push(sid);
                  persist();
                  renderStoriesSection();
                  showToast('Laporan diterima. Cerita disembunyikan dari tampilanmu.', 'success');
                }
              }
            ]
          );
        }
      });

      document.getElementById('view-stories').addEventListener('submit', (e) => {
        const form = e.target.closest('[data-comment-form]');
        if (!form) return;
        e.preventDefault();
        const input = form.querySelector('input');
        const text = input.value.trim();
        if (!text) return;
        const st = state.stories.find((s) => s.id === form.dataset.commentForm);
        if (st) {
          st.comments.push({ id: 'c-' + Date.now(), text, time: 'Baru saja' });
          persist();
          renderStoriesSection();
          showToast('Komentar dukunganmu telah ditambahkan.', 'success');
        }
      });

      // -------------------- 4. PSYCHOLOGY CORNER --------------------
      function renderPsychologySection() {
        const grid = document.getElementById('articles-grid');
        grid.innerHTML = '';
        const list = DEFAULT_ARTICLES.filter((a) => articleFilter === 'Semua' || a.category === articleFilter);
        list.forEach((art) => {
          const card = document.createElement('article');
          card.className = 'soft-card soft-card-hover rounded-3xl overflow-hidden flex flex-col justify-between';
          card.innerHTML = `
            <div>
              <div class="h-32 bg-gradient-to-br ${art.color} flex items-center justify-center relative">
                <i data-lucide="${art.icon}" class="w-12 h-12 text-pastel-700/80"></i>
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-pastel-700">${escapeHTML(art.category)}</span>
              </div>
              <div class="p-5 space-y-2">
                <span class="text-[11px] text-pastel-500 font-medium">${escapeHTML(art.readTime)}</span>
                <h3 class="text-base font-bold text-pastel-800 leading-snug">${escapeHTML(art.title)}</h3>
                <p class="text-xs text-pastel-700/80 leading-relaxed">${escapeHTML(art.summary)}</p>
              </div>
            </div>
            <div class="px-5 pb-5">
              <button type="button" data-read-article="${art.id}" class="w-full py-2.5 rounded-2xl bg-pastel-100 hover:bg-pastel-200 text-pastel-700 text-xs font-semibold transition-colors">
                Baca Selengkapnya
              </button>
            </div>
          `;
          grid.appendChild(card);
        });

        const vList = document.getElementById('videos-list');
        vList.innerHTML = '';
        DEFAULT_VIDEOS.forEach((v) => {
          const item = document.createElement('div');
          item.className = 'soft-card rounded-2xl p-4 flex items-center justify-between gap-3';
          item.innerHTML = `
            <div class="space-y-1">
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pastel-100 text-pastel-700">${escapeHTML(v.topic)} • ${escapeHTML(v.duration)}</span>
              <h4 class="text-sm font-bold text-pastel-800">${escapeHTML(v.title)}</h4>
              <p class="text-xs text-pastel-700/80">${escapeHTML(v.desc)}</p>
            </div>
            <button type="button" data-watch-video="${v.id}" class="shrink-0 w-10 h-10 rounded-full bg-pastel-500 hover:bg-pastel-600 text-white flex items-center justify-center">
              <i data-lucide="play" class="w-4 h-4"></i>
            </button>
          `;
          vList.appendChild(item);
        });

        const wList = document.getElementById('webinars-list');
        wList.innerHTML = '';
        DEFAULT_WEBINARS.forEach((w) => {
          const isReg = state.registeredWebinars.includes(w.id);
          const item = document.createElement('div');
          item.className = 'soft-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3';
          item.innerHTML = `
            <div class="space-y-1">
              <span class="text-[11px] font-semibold text-pastel-600">${escapeHTML(w.date)}</span>
              <h4 class="text-sm font-bold text-pastel-800">${escapeHTML(w.title)}</h4>
              <p class="text-xs text-pastel-700/80">${escapeHTML(w.speaker)} • ${escapeHTML(w.quota)}</p>
            </div>
            <button type="button" data-reg-webinar="${w.id}" class="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold ${isReg ? 'bg-emerald-100 text-emerald-700' : 'bg-pastel-500 hover:bg-pastel-600 text-white'}">
              ${isReg ? 'Terdaftar ✓' : 'Daftar (Demo)'}
            </button>
          `;
          wList.appendChild(item);
        });

        if (window.lucide) lucide.createIcons();
      }

      document.getElementById('article-filter-bar').addEventListener('click', (e) => {
        const btn = e.target.closest('.article-filter-btn');
        if (!btn) return;
        articleFilter = btn.dataset.cat;
        document.querySelectorAll('.article-filter-btn').forEach((b) => {
          b.className = b.dataset.cat === articleFilter
            ? 'article-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-pastel-500 text-white'
            : 'article-filter-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-pastel-200 text-pastel-700';
        });
        renderPsychologySection();
      });

      document.getElementById('view-psychology').addEventListener('click', (e) => {
        const artBtn = e.target.closest('[data-read-article]');
        if (artBtn) {
          const art = DEFAULT_ARTICLES.find((a) => a.id === artBtn.dataset.readArticle);
          if (art) {
            openModal(
              art.title,
              `<span class="inline-block px-2.5 py-0.5 rounded-full bg-pastel-100 text-pastel-700 text-xs font-semibold">${escapeHTML(art.category)} • ${escapeHTML(art.readTime)}</span>` +
              art.content.map((p) => `<p>${escapeHTML(p)}</p>`).join(''),
              [{ label: 'Tutup', className: 'px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-semibold' }]
            );
          }
          return;
        }

        const vidBtn = e.target.closest('[data-watch-video]');
        if (vidBtn) {
          const v = DEFAULT_VIDEOS.find((x) => x.id === vidBtn.dataset.watchVideo);
          if (v) {
            openModal(
              v.title,
              `
                <div class="rounded-2xl bg-pastel-100 p-8 text-center space-y-2 border border-pastel-200">
                  <p class="text-3xl">🎬</p>
                  <p class="text-xs font-semibold text-pastel-700">Pratinjau Video Edukasi (Simulasi Demo)</p>
                  <p class="text-xs text-pastel-600">Durasi: ${escapeHTML(v.duration)}</p>
                </div>
                <p class="text-sm">${escapeHTML(v.desc)}</p>
              `,
              [{ label: 'Selesai Menonton', className: 'px-4 py-2 rounded-xl bg-pastel-500 text-white text-xs font-semibold' }]
            );
          }
          return;
        }

        const webBtn = e.target.closest('[data-reg-webinar]');
        if (webBtn) {
          const wid = webBtn.dataset.regWebinar;
          if (!state.registeredWebinars.includes(wid)) {
            state.registeredWebinars.push(wid);
            persist();
            renderPsychologySection();
            showToast('Berhasil mendaftar webinar (Simulasi Demo)!', 'success');
          } else {
            showToast('Kamu sudah terdaftar pada webinar ini.');
          }
        }
      });

      // -------------------- 5. KONSULTASI PSIKOLOG --------------------
      function renderConsultationSection() {
        const list = document.getElementById('psychologists-list');
        const select = document.getElementById('consult-psychologist');
        list.innerHTML = '';
        select.innerHTML = '';

        PLACEHOLDER_PSYCHOLOGISTS.forEach((p) => {
          const opt = document.createElement('option');
          opt.value = p.name;
          opt.textContent = p.name;
          select.appendChild(opt);

          const card = document.createElement('div');
          card.className = 'soft-card rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4';
          card.innerHTML = `
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">Data Contoh</span>
                <span class="text-xs text-pastel-600 font-medium">${escapeHTML(p.mode)}</span>
              </div>
              <h3 class="text-base font-bold text-pastel-800">${escapeHTML(p.name)}</h3>
              <p class="text-xs font-medium text-pastel-600">${escapeHTML(p.role)}</p>
              <p class="text-xs text-pastel-700/85">Fokus: ${escapeHTML(p.focus)}</p>
              <p class="text-xs text-pastel-700">Jadwal Contoh: <strong>${escapeHTML(p.schedule)}</strong></p>
            </div>
            <button type="button" data-pick-psy="${escapeHTML(p.name)}" class="shrink-0 px-4 py-2 rounded-2xl bg-pastel-100 hover:bg-pastel-200 text-pastel-700 text-xs font-semibold">
              Pilih Jadwal
            </button>
          `;
          list.appendChild(card);
        });

        const dateInput = document.getElementById('consult-date');
        if (!dateInput.value) dateInput.value = offsetDate(2);

        const hist = document.getElementById('consult-history');
        if (state.consultations.length === 0) {
          hist.innerHTML = '<p class="text-pastel-500">Belum ada permintaan jadwal simulasi.</p>';
        } else {
          hist.innerHTML = state.consultations.map((c) => `
            <div class="p-3 rounded-2xl bg-pastel-50 border border-pastel-100 space-y-1">
              <div class="flex justify-between font-semibold text-pastel-800">
                <span>${escapeHTML(c.psychologist)}</span>
                <span class="text-pastel-600">${escapeHTML(c.date)} • ${escapeHTML(c.time)}</span>
              </div>
              <p class="text-pastel-600">${escapeHTML(c.type)} — <span class="text-emerald-700 font-semibold">Simulasi Terkirim</span></p>
            </div>
          `).join('');
        }
      }

      document.getElementById('view-consultation').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-pick-psy]');
        if (btn) {
          document.getElementById('consult-psychologist').value = btn.dataset.pickPsy;
          document.getElementById('consult-notes').focus();
          showToast('Konselor contoh dipilih pada formulir.');
        }
      });

      document.getElementById('consult-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const psychologist = document.getElementById('consult-psychologist').value;
        const type = document.getElementById('consult-type').value;
        const date = document.getElementById('consult-date').value;
        const time = document.getElementById('consult-time').value;
        const notes = document.getElementById('consult-notes').value.trim();
        if (!date || !notes) {
          showToast('Lengkapi tanggal dan topik singkat terlebih dahulu.', 'error');
          return;
        }
        state.consultations.unshift({ id: 'con-' + Date.now(), psychologist, type, date, time, notes });
        persist();
        document.getElementById('consult-notes').value = '';
        renderConsultationSection();
        showToast('Permintaan jadwal simulasi berhasil dicatat!', 'success');
      });

      // -------------------- 6. MOOD TRACKER --------------------
      function getUserMoods() {
        const key = getActiveUserKey();
        if (!state.moodLogsByUser[key]) state.moodLogsByUser[key] = [];
        return state.moodLogsByUser[key];
      }

      function renderMoodSection() {
        document.getElementById('mood-owner-label').textContent = state.currentUser ? state.currentUser.name : 'Tamu (Lokal)';
        const dateInput = document.getElementById('mood-date');
        if (!dateInput.value) dateInput.value = todayISO;

        // Highlight selected emoji
        document.querySelectorAll('.mood-opt').forEach((btn) => {
          const active = Number(btn.dataset.score) === selectedMood.score;
          btn.className = active
            ? 'mood-opt flex flex-col items-center p-2.5 rounded-2xl border-2 border-pastel-500 bg-pastel-100 transition-all scale-105'
            : 'mood-opt flex flex-col items-center p-2.5 rounded-2xl border border-pastel-200 bg-pastel-50/50 hover:bg-pastel-100 transition-all';
        });

        const logs = getUserMoods();

        // Render Calendar (Current Month)
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        document.getElementById('calendar-month-label').textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const calGrid = document.getElementById('mood-calendar-grid');
        calGrid.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
          calGrid.appendChild(document.createElement('div'));
        }
        for (let d = 1; d <= daysInMonth; d++) {
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const dayLog = logs.find((l) => l.date === iso);
          const cell = document.createElement('button');
          cell.type = 'button';
          cell.dataset.calDate = iso;
          cell.className = `h-9 rounded-xl text-xs flex flex-col items-center justify-center border transition-colors ${
            dayLog ? 'bg-pastel-100 border-pastel-300 font-bold text-pastel-800' : 'bg-white border-pastel-100 text-pastel-600 hover:bg-pastel-50'
          }`;
          cell.innerHTML = dayLog ? `<span class="text-sm leading-none">${dayLog.emoji}</span>` : `<span>${d}</span>`;
          calGrid.appendChild(cell);
        }

        // Render History
        const hist = document.getElementById('mood-history-list');
        if (logs.length === 0) {
          hist.innerHTML = '<p class="text-xs text-pastel-500">Belum ada catatan mood. Mulai catat perasaanmu hari ini!</p>';
        } else {
          const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
          hist.innerHTML = sorted.map((l) => `
            <div class="p-3 rounded-2xl bg-pastel-50/80 border border-pastel-100 flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <span class="text-2xl">${l.emoji}</span>
                <div>
                  <p class="text-xs font-bold text-pastel-800">${escapeHTML(l.label)} <span class="font-normal text-pastel-500">• ${escapeHTML(l.date)}</span></p>
                  <p class="text-xs text-pastel-700 mt-0.5">${escapeHTML(l.note || 'Tanpa catatan')}</p>
                </div>
              </div>
              <button type="button" data-del-mood="${l.id}" class="text-xs text-rose-500 hover:text-rose-700 p-1" title="Hapus">✕</button>
            </div>
          `).join('');
        }

        // Render Chart.js
        const ctx = document.getElementById('mood-chart-canvas').getContext('2d');
        const chartLogs = [...logs].sort((a, b) => a.date.localeCompare(b.date)).slice(-10);
        if (moodChartInstance) moodChartInstance.destroy();
        moodChartInstance = new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartLogs.map((l) => l.date.slice(5)),
            datasets: [{
              label: 'Skor Suasana Hati',
              data: chartLogs.map((l) => l.score),
              borderColor: '#4F9CF2',
              backgroundColor: 'rgba(130, 194, 250, 0.25)',
              fill: true,
              tension: 0.35,
              pointRadius: 5,
              pointBackgroundColor: '#357ED8'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { min: 1, max: 5, ticks: { stepSize: 1 } }
            },
            plugins: {
              legend: { display: false }
            }
          }
        });
      }

      document.getElementById('mood-emoji-picker').addEventListener('click', (e) => {
        const btn = e.target.closest('.mood-opt');
        if (!btn) return;
        selectedMood = {
          score: Number(btn.dataset.score),
          label: btn.dataset.label,
          emoji: btn.dataset.emoji
        };
        renderMoodSection();
      });

      document.getElementById('mood-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('mood-date').value || todayISO;
        const note = document.getElementById('mood-note').value.trim();
        const logs = getUserMoods();
        logs.unshift({
          id: 'm-' + Date.now(),
          date,
          score: selectedMood.score,
          label: selectedMood.label,
          emoji: selectedMood.emoji,
          note
        });
        persist();
        document.getElementById('mood-note').value = '';
        renderMoodSection();
        showToast('Suasana hatimu berhasil disimpan secara privat.', 'success');
      });

      document.getElementById('view-mood').addEventListener('click', (e) => {
        const delBtn = e.target.closest('[data-del-mood]');
        if (delBtn) {
          const key = getActiveUserKey();
          state.moodLogsByUser[key] = getUserMoods().filter((m) => m.id !== delBtn.dataset.delMood);
          persist();
          renderMoodSection();
          return;
        }
        const calBtn = e.target.closest('[data-cal-date]');
        if (calBtn) {
          const iso = calBtn.dataset.calDate;
          const entries = getUserMoods().filter((m) => m.date === iso);
          const box = document.getElementById('calendar-day-detail');
          box.classList.remove('hidden');
          box.innerHTML = entries.length
            ? `<strong>${iso}:</strong> ` + entries.map((x) => `${x.emoji} ${escapeHTML(x.label)} (${escapeHTML(x.note || '-')})`).join('; ')
            : `<strong>${iso}:</strong> Belum ada catatan mood pada tanggal ini.`;
        }
      });

      // -------------------- 7. SELF-CARE CORNER --------------------
      function resetBreathing() {
        if (breathInterval) {
          clearInterval(breathInterval);
          breathInterval = null;
        }
        breathRunning = false;
        document.getElementById('btn-breath-start').textContent = 'Mulai';
        document.getElementById('breath-phase').textContent = 'Siap';
        document.getElementById('breath-timer').textContent = '4s';
        document.getElementById('breath-outer').style.transform = 'scale(1)';
      }

      function startBreathing() {
        if (breathRunning) {
          resetBreathing();
          return;
        }
        breathRunning = true;
        document.getElementById('btn-breath-start').textContent = 'Jeda';
        const phases = [
          { name: 'Tarik Napas', secs: 4, scale: 1.25 },
          { name: 'Tahan', secs: 7, scale: 1.25 },
          { name: 'Hembuskan', secs: 8, scale: 0.92 }
        ];
        let pIdx = 0;
        let remain = phases[0].secs;

        function updateUI() {
          document.getElementById('breath-phase').textContent = phases[pIdx].name;
          document.getElementById('breath-timer').textContent = `${remain}s`;
          document.getElementById('breath-outer').style.transform = `scale(${phases[pIdx].scale})`;
        }
        updateUI();

        breathInterval = setInterval(() => {
          remain--;
          if (remain <= 0) {
            pIdx = (pIdx + 1) % phases.length;
            remain = phases[pIdx].secs;
          }
          updateUI();
        }, 1000);
      }

      document.getElementById('btn-breath-start').addEventListener('click', startBreathing);
      document.getElementById('btn-breath-reset').addEventListener('click', resetBreathing);

      function getUserJournals() {
        const key = getActiveUserKey();
        if (!state.journalsByUser[key]) state.journalsByUser[key] = [];
        return state.journalsByUser[key];
      }

      function renderSelfCareSection() {
        // Grounding checklist
        const gBox = document.getElementById('grounding-list');
        gBox.innerHTML = GROUNDING_STEPS.map((g) => {
          const checked = !!state.groundingChecked[g.id];
          return `
            <label class="flex items-center gap-3 p-3 rounded-2xl bg-pastel-50/70 border border-pastel-100 cursor-pointer text-xs text-pastel-800">
              <input type="checkbox" data-ground-id="${g.id}" ${checked ? 'checked' : ''} class="w-4 h-4 accent-pastel-500 rounded" />
              <span class="${checked ? 'line-through text-pastel-500' : ''}">${escapeHTML(g.label)}</span>
            </label>
          `;
        }).join('');

        // Reflection prompt
        document.getElementById('reflection-prompt-text').textContent = REFLECTION_PROMPTS[state.reflectionIndex % REFLECTION_PROMPTS.length];

        // Journals
        const jList = document.getElementById('journal-list');
        const journals = getUserJournals();
        jList.innerHTML = journals.length
          ? journals.map((j) => `
              <div class="p-3 rounded-2xl bg-pastel-50 border border-pastel-100 text-xs space-y-1">
                <div class="flex justify-between font-bold text-pastel-800">
                  <span>${escapeHTML(j.title)}</span>
                  <span class="font-normal text-pastel-500">${escapeHTML(j.date)}</span>
                </div>
                <p class="text-pastel-700">${escapeHTML(j.body)}</p>
              </div>
            `).join('')
          : '<p class="text-xs text-pastel-500">Belum ada catatan jurnal.</p>';
      }

      document.getElementById('grounding-list').addEventListener('change', (e) => {
        const cb = e.target.closest('[data-ground-id]');
        if (!cb) return;
        state.groundingChecked[cb.dataset.groundId] = cb.checked;
        persist();
        renderSelfCareSection();
      });

      document.getElementById('btn-shuffle-prompt').addEventListener('click', () => {
        state.reflectionIndex = (state.reflectionIndex + 1) % REFLECTION_PROMPTS.length;
        persist();
        renderSelfCareSection();
      });

      document.getElementById('btn-save-reflection').addEventListener('click', () => {
        const ans = document.getElementById('reflection-answer').value.trim();
        if (!ans) return;
        getUserJournals().unshift({
          id: 'jr-' + Date.now(),
          title: 'Refleksi Diri',
          body: ans,
          date: todayISO
        });
        persist();
        document.getElementById('reflection-answer').value = '';
        renderSelfCareSection();
        showToast('Refleksi dirimu tersimpan ke jurnal!', 'success');
      });

      document.getElementById('journal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('journal-title').value.trim() || 'Catatan Harian';
        const body = document.getElementById('journal-body').value.trim();
        if (!body) {
          showToast('Tuliskan isi jurnalmu terlebih dahulu.', 'error');
          return;
        }
        getUserJournals().unshift({ id: 'j-' + Date.now(), title, body, date: todayISO });
        persist();
        document.getElementById('journal-title').value = '';
        document.getElementById('journal-body').value = '';
        renderSelfCareSection();
        showToast('Jurnal harian tersimpan.', 'success');
      });

      // -------------------- 8. PROFILE & SETTINGS --------------------
      function renderProfileSection() {
        const authPanel = document.getElementById('auth-panel');
        const dash = document.getElementById('profile-dashboard');

        if (!state.currentUser) {
          authPanel.classList.remove('hidden');
          dash.classList.add('hidden');
          return;
        }

        authPanel.classList.add('hidden');
        dash.classList.remove('hidden');

        document.getElementById('prof-name').value = state.currentUser.name || '';
        document.getElementById('prof-email').value = state.currentUser.email || '';
        document.getElementById('prof-status').value = state.currentUser.status || '';

        document.getElementById('pref-anon').checked = state.preferences.anonDefault;
        document.getElementById('pref-private-mood').checked = state.preferences.privateMood;
        document.getElementById('pref-notif-mood').checked = state.preferences.notifMood;
        document.getElementById('pref-notif-webinar').checked = state.preferences.notifWebinar;

        document.getElementById('stat-moods').textContent = getUserMoods().length;
        document.getElementById('stat-journals').textContent = getUserJournals().length;
        document.getElementById('stat-stories').textContent = state.moderationQueue.length;
        document.getElementById('stat-consults').textContent = state.consultations.length;
      }

      document.getElementById('tab-login').addEventListener('click', () => {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('tab-login').className = 'flex-1 py-2 rounded-xl text-sm font-semibold bg-white text-pastel-800 shadow-sm';
        document.getElementById('tab-register').className = 'flex-1 py-2 rounded-xl text-sm font-semibold text-pastel-600';
      });

      document.getElementById('tab-register').addEventListener('click', () => {
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('tab-register').className = 'flex-1 py-2 rounded-xl text-sm font-semibold bg-white text-pastel-800 shadow-sm';
        document.getElementById('tab-login').className = 'flex-1 py-2 rounded-xl text-sm font-semibold text-pastel-600';
      });

      document.getElementById('btn-demo-login').addEventListener('click', () => {
        state.currentUser = state.users[0];
        persist();
        syncHeaderUser();
        renderProfileSection();
        showToast('Masuk sebagai Akun Demo Mahasiswa.', 'success');
      });

      document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const pw = document.getElementById('login-password').value;
        const found = state.users.find((u) => u.email.toLowerCase() === email && u.password === pw);
        if (!found) {
          showToast('Email atau kata sandi tidak cocok. Coba Akun Demo atau Daftar Baru.', 'error');
          return;
        }
        state.currentUser = found;
        persist();
        syncHeaderUser();
        renderProfileSection();
        showToast(`Selamat datang kembali, ${found.name}!`, 'success');
      });

      document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const password = document.getElementById('reg-password').value;
        if (state.users.some((u) => u.email.toLowerCase() === email)) {
          showToast('Email sudah terdaftar. Silakan masuk.', 'error');
          return;
        }
        const newUser = { id: 'u-' + Date.now(), name, email, password, status: 'Mahasiswa' };
        state.users.push(newUser);
        state.currentUser = newUser;
        persist();
        syncHeaderUser();
        renderProfileSection();
        showToast('Akun simulasi berhasil dibuat!', 'success');
      });

      document.getElementById('btn-logout').addEventListener('click', () => {
        state.currentUser = null;
        persist();
        syncHeaderUser();
        renderProfileSection();
        showToast('Kamu telah keluar dari akun.');
      });

      document.getElementById('profile-update-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (!state.currentUser) return;
        state.currentUser.name = document.getElementById('prof-name').value.trim() || state.currentUser.name;
        state.currentUser.status = document.getElementById('prof-status').value.trim();
        const idx = state.users.findIndex((u) => u.id === state.currentUser.id);
        if (idx !== -1) state.users[idx] = state.currentUser;
        persist();
        syncHeaderUser();
        showToast('Profil berhasil diperbarui.', 'success');
      });

      ['pref-anon', 'pref-private-mood', 'pref-notif-mood', 'pref-notif-webinar'].forEach((id) => {
        document.getElementById(id).addEventListener('change', () => {
          state.preferences.anonDefault = document.getElementById('pref-anon').checked;
          state.preferences.privateMood = document.getElementById('pref-private-mood').checked;
          state.preferences.notifMood = document.getElementById('pref-notif-mood').checked;
          state.preferences.notifWebinar = document.getElementById('pref-notif-webinar').checked;
          persist();
          showToast('Pengaturan disimpan.');
        });
      });

      document.getElementById('btn-clear-history').addEventListener('click', () => {
        openModal(
          'Bersihkan Riwayat Aktivitas?',
          '<p>Tindakan ini akan menghapus log mood, jurnal, dan permintaan jadwal simulasi milik akun aktif.</p>',
          [
            { label: 'Batal', className: 'px-4 py-2 rounded-xl bg-pastel-100 text-pastel-700 text-xs font-semibold' },
            {
              label: 'Ya, Bersihkan',
              className: 'px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold',
              onClick: () => {
                const key = getActiveUserKey();
                state.moodLogsByUser[key] = [];
                state.journalsByUser[key] = [];
                state.consultations = [];
                persist();
                renderProfileSection();
                showToast('Riwayat aktivitas berhasil dibersihkan.', 'success');
              }
            }
          ]
        );
      });

      document.getElementById('btn-delete-account').addEventListener('click', () => {
        openModal(
          'Hapus Akun & Data Pribadi?',
          '<p>Seluruh data akun ini beserta catatan mood dan jurnal pribadinya akan dihapus permanen dari browser Anda.</p>',
          [
            { label: 'Batal', className: 'px-4 py-2 rounded-xl bg-pastel-100 text-pastel-700 text-xs font-semibold' },
            {
              label: 'Hapus Permanen',
              className: 'px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold',
              onClick: () => {
                if (state.currentUser) {
                  const uid = state.currentUser.id;
                  delete state.moodLogsByUser[uid];
                  delete state.journalsByUser[uid];
                  state.users = state.users.filter((u) => u.id !== uid);
                  state.currentUser = null;
                }
                persist();
                syncHeaderUser();
                renderProfileSection();
                showToast('Akun dan data pribadi telah dihapus.', 'success');
              }
            }
          ]
        );
      });

      // -------------------- INIT --------------------
      syncHeaderUser();
      syncGeminiUI();
      renderChat();
      navigateTo('home');
      if (window.lucide) lucide.createIcons();
    })();
