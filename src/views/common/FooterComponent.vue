<template>
  <footer class="footer">
    <div class="footer-left">
      <p>㈜디케이비엠시 ㅣ 대표 : 배창욱 ㅣ 사업자등록번호 : 210-81-65384 ㅣ <a href="#">개인정보 처리방침</a></p>
      <p>Copyright © 2021 DK BMC Co.,Ltd. All Rights Reserved.</p>
    </div>
    <div class="footer-right">
      <div class="footer-contact">
        <p><strong>Address</strong><br>434 Bongeunsa-ro,<br>Gangnam-gu, Seoul</p>
        <p><strong>Tel</strong><br>02-514-3587</p>
        <p><strong>Fax</strong><br>02-956-3636</p>
        <div class="footer-social">
          <strong>Social</strong>
          <div>
            <a href="#"><img src="/path/to/facebook-icon.png" alt="Facebook"></a>
            <a href="#"><img src="/path/to/blog-icon.png" alt="Blog"></a>
            <a href="#"><img src="/path/to/linkedin-icon.png" alt="LinkedIn"></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  border-top: 1px solid #e7e7e7;
  /* position: fixed;
  bottom: 0;
  left: 0; */
  width: 100%;
  box-sizing: border-box;
}

.footer-left {
  flex: 1;
  font-size: 14px;
  color: #333;
  width: 60% !important;
}

.footer-left p {
  margin: 5px 0;
}

.footer-left a {
  color: #007bff;
  text-decoration: none;
}

.footer-left a:hover {
  text-decoration: underline;
}

.footer-right {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: #333;
  width: 40% !important;
}

.footer-contact {
  margin-left: 20px;
  display: flex;
}

.footer-contact p {
  margin: 5px 10px;
}

.footer-social {
  margin-top: 5px;
}

.footer-social div {
  display: flex;
  gap: 10px;
}

.footer-social img {
  width: 20px;
  height: 20px;
}
</style>
