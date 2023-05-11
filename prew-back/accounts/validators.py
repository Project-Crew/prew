from django.core.exceptions import ValidationError

# 비밀번호에 대한 validator는 함수가 아닌 클래스로 만들어야 함.
class CustomPasswordValidator:
    def validate(self, password, user=None):
        if len(password) < 8:
            raise ValidationError("비밀번호는 최소 8자 이상입니다.")
    
    def get_help_text(self):
        return "어드민 페이지에서 비밀번호 설정"