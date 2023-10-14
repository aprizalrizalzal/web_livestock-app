<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
<template>
  <div class="about">
    <main class="mb-3">
      <p v-if="message" class="alert alert-info text-center">{{ message }}</p>
      <div class="text-center">
        <h2 class="mx-3 my-3">Tentang Sistem Informasi Penjualan Hewan Ternak</h2>
        <h2 class="mx-3 my-3">di Nusa Tenggara Barat!</h2>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p>Sebuah tim berdedikasi kami dengan bangga mempersembahkan aplikasi Sistem Informasi Hewan Ternak ini kepada Anda. Aplikasi ini telah dirancang untuk membantu Anda mengelola data hewan ternak secara praktis dan efisien.</p>

          <p>
            Dalam aplikasi ini, Anda dapat mencatat informasi penting tentang hewan ternak, termasuk jenis hewan, deskripsi, foto, serta berbagai detail profil lainnya. Kami juga menyediakan fitur untuk mengedit, menghapus, dan mengunggah foto-foto hewan ternak Anda, sehingga Anda dapat dengan cepat memperbarui
            informasi mereka.
          </p>

          <p>
            Kami sepenuhnya memahami bahwa hewan ternak Anda memiliki nilai yang sangat penting, dan oleh karena itu kami berkomitmen untuk memberikan pengalaman pengguna terbaik dengan antarmuka yang intuitif. Tujuan kami adalah memberikan solusi yang optimal untuk kebutuhan Anda dalam mengelola data hewan ternak
            melalui sistem informasi ini.
          </p>

          <p>Jika Anda menginginkan perubahan status akun Anda dari pembeli menjadi penjual, Anda dapat menghubungi kami melalui email atau nomor telepon berikut:</p>
          <p><b>Email: info@contoh.com</b></p>
          <p><b>Telepon: (123) 456-7890</b></p>

          <p>Tim kami akan dengan senang hati membantu Anda dalam proses perubahan status akun Anda. Kami akan memberikan panduan langkah demi langkah yang diperlukan untuk mengaktifkan fitur penjual dalam aplikasi.</p>

          <p>
            Kami terus berupaya untuk melakukan pengembangan dan perbaikan berkelanjutan pada aplikasi ini guna memberikan Anda kemudahan dan efisiensi dalam pekerjaan sehari-hari Anda. Kami juga sangat terbuka terhadap umpan balik dan saran dari pengguna kami sehingga kami dapat terus meningkatkan aplikasi ini sesuai
            dengan kebutuhan Anda.
          </p>

          <p>Terima kasih telah menggunakan aplikasi Sistem Informasi Hewan Ternak kami. Kami berharap aplikasi ini dapat membantu Anda mengelola dan merawat hewan ternak Anda dengan lebih baik. Jika Anda memiliki pertanyaan atau membutuhkan bantuan, jangan ragu untuk menghubungi tim dukungan kami.</p>

          <p>Kami menghargai kepercayaan Anda dan berkomitmen untuk memberikan yang terbaik!</p>

          <p class="text-right">Salam hormat,<br />Tim Pengembang Aplikasi Sistem Informasi Hewan Ternak</p>
        </div>
      </div>
      <div class="py-3">
        <button @click="goBack" class="btn btn-outline-secondary"><i class="bi bi-back"></i> Kembali</button>
      </div>
    </main>
  </div>
</template>
