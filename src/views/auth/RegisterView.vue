<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const storeAuth = useAuthStore();

const userData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: '',
};

const passwordError = ref('');

const validatePassword = () => {
  if (userData.password.length < 8) {
    passwordError.value = 'Password harus minimal 8 karakter.';
  } else {
    passwordError.value = ''; 
  }
};

const router = useRouter();

const reload = localStorage.getItem('reloaded');

const registerUser = async () => {
  try {
    await storeAuth.register(userData);
    if (storeAuth.isLoggedIn) {
      router.push({ name: 'home' });
    } else {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  if (reload === 'false') {
    window.location.reload();
    localStorage.setItem('reloaded', true);
  }
});
</script>
<template>
  <div class="register">
    <h2 class="fw-bold mb-4 pt-4 text-center"><i class="bi bi-box-arrow-in-left"></i> Daftar</h2>
    <div class="row d-flex justify-content-center mx-4">
      <div class="rounded bg-white p-4 shadow-sm col-md-6">
        <p>Daftar sekarang untuk bisa mengakses semua fitur.</p>
        <form @submit.prevent="registerUser">
          <div class="form-floating mb-2">
            <input type="text" class="form-control shadow-sm" id="floatingName" placeholder="Example" v-model="userData.name" required />
            <label for="floatingName">Nama</label>
          </div>
          <div class="m-2">
            <span class="me-2">Peran</span>
            <div class="form-check form-check-inline">
              <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="seller" value="seller" v-model="userData.role" />
              <label class="form-check-label" for="seller">Penjual</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input shadow-sm" type="radio" name="inlineRadioOptions" id="buyer" value="buyer" v-model="userData.role" />
              <label class="form-check-label" for="buyer">Pembeli</label>
            </div>
          </div>
          <div class="form-floating mb-2">
            <input type="email" class="form-control shadow-sm" id="floatingEmail" placeholder="name@example.com" v-model="userData.email" required />
            <label for="floatingEmail">Email</label>
          </div>
          <div class="form-floating mb-2">
            <input type="password" class="form-control shadow-sm" id="floatingPassword" placeholder="Password" v-model="userData.password" @input="validatePassword" required />
            <label for="floatingPassword">Password</label>
            <div v-if="passwordError" class="text-danger mt-1">
              {{ passwordError }}
            </div>
          </div>
          <div class="form-floating mb-2">
            <input type="password" class="form-control shadow-sm" id="floatingPasswordConfirmation" placeholder="Konfirmasi Password" v-model="userData.password_confirmation" required />
            <label for="floatingPasswordConfirmation">Konfirmasi Password</label>
          </div>
          <div class="form-check">
            <input class="form-check-input shadow-sm" type="checkbox" v-model="userData.agree" id="flexCheckChecked" checked />
            <a href="#" class="form-check-label text-decoration-none" for="flexCheckChecked" data-bs-toggle="modal" data-bs-target="#showModal"> Setuju dengan syarat dan ketentuan </a>
          </div>
          <div id="showModal" class="modal modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Setuju dengan syarat dan ketentuan</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                  <p>Syarat dan Ketentuan Penggunaan Aplikasi Sistem Informasi Penjualan Hewan Ternak di NTB</p>
                  <p>Versi: 1.0</p>
                  <p>
                    Terakhir diperbarui: <i><b>Tanggal</b></i>
                  </p>
                  <p>
                    Selamat datang di Aplikasi Sistem Informasi Penjualan Hewan Ternak di NTB. Aplikasi ini disediakan oleh <i><b>Nama Perusahaan/Pengembang</b></i
                    >, dan penggunaan aplikasi ini tunduk pada syarat dan ketentuan berikut. Mohon untuk membaca dengan cermat.
                  </p>
                  <ol>
                    <li>
                      <b>Definisi</b>
                      <ol type="a">
                        <li><b>Aplikasi</b>: Merujuk kepada Aplikasi Sistem Informasi Penjualan Hewan Ternak di NTB.</li>
                        <li><b>Pengguna</b>: Merujuk kepada individu atau entitas yang menggunakan Aplikasi.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Penerimaan Syarat dan Ketentuan</b>
                      <ol type="a">
                        <li>Dengan mengakses atau menggunakan Aplikasi ini, Anda secara tegas setuju untuk terikat oleh syarat dan ketentuan yang tercantum dalam dokumen ini. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap segera berhenti menggunakan Aplikasi.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Penggunaan Aplikasi</b>
                      <ol type="a">
                        <li>Penggunaan Aplikasi ini adalah untuk tujuan penjualan hewan ternak di wilayah NTB.</li>
                        <li>Pengguna harus memiliki izin dan mematuhi semua hukum dan peraturan yang berlaku yang berkaitan dengan penjualan hewan ternak.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Privasi Pengguna</b>
                      <ol type="a">
                        <li>Kami menghormati privasi Anda. Informasi pribadi yang Anda berikan kepada kami akan diatur oleh Kebijakan Privasi yang terpisah. Mohon baca Kebijakan Privasi kami.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Ketentuan Pembayaran</b>
                      <ol type="a">
                        <li>a. Jika ada biaya yang terkait dengan penggunaan Aplikasi ini, Anda akan diminta untuk membayar biaya tersebut sesuai dengan ketentuan yang berlaku.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Pembatasan Tanggung Jawab</b>
                      <ol type="a">
                        <li>Kami tidak bertanggung jawab atas kerugian atau kerusakan yang disebabkan oleh penggunaan Aplikasi ini.</li>
                        <li>Kami tidak memberikan jaminan terhadap kelengkapan, akurasi, atau ketersediaan informasi yang diberikan melalui Aplikasi ini.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Pengakhiran Penggunaan</b>
                      <ol type="a">
                        <li>Kami berhak untuk mengakhiri akses Anda ke Aplikasi ini kapan saja jika Anda melanggar syarat dan ketentuan ini.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Perubahan Syarat dan Ketentuan</b>
                      <ol type="a">
                        <li>Kami dapat mengubah syarat dan ketentuan ini dari waktu ke waktu. Perubahan akan diberitahukan kepada pengguna melalui Aplikasi atau melalui kontak yang diberikan oleh pengguna.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Hukum yang Berlaku</b>
                      <ol type="a">
                        <li>Syarat dan ketentuan ini diatur oleh hukum negara Republik Indonesia, khususnya hukum yang berlaku di Provinsi NTB.</li>
                      </ol>
                    </li>
                    <li>
                      <b>Kontak</b>
                      <ol type="a">
                        <li>
                          Jika Anda memiliki pertanyaan atau komentar tentang syarat dan ketentuan ini, harap hubungi kami melalui <i><b>kontak yang disediakan</b></i
                          >.
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <p>Dengan menerima syarat dan ketentuan ini, Anda setuju untuk mematuhi semua ketentuan yang tercantum di atas. Syarat dan ketentuan ini berlaku sejak Anda mulai menggunakan Aplikasi ini.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ya</button>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary shadow-sm mt-2"><i class="bi bi-box-arrow-in-left"></i> Daftar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
