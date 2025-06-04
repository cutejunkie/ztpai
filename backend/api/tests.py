# from django.test import TestCase
# from rest_framework.test import APITestCase
# from rest_framework import status
# from django.urls import reverse
# from api.models import CustomUser, Card
# from uuid import uuid4

# class APITests(APITestCase):
#     def setUp(self):
#         # Tworzenie użytkownika
#         self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
#         self.client.login(username='testuser', password='testpass')
#         # Tworzenie karty
#         self.card = Card.objects.create(title='Test Card', content='Test Content', user=self.user)

#     def test_hello_endpoint(self):
#         response = self.client.get('/api/v1/hello/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_login_success(self):
#         self.client.logout()
#         response = self.client.post('/api/v1/login/', {'username': 'testuser', 'password': 'testpass'})
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_login_failure(self):
#         self.client.logout()
#         response = self.client.post('/api/v1/login/', {'username': 'wrong', 'password': 'wrong'})
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#     def test_register_success(self):
#         self.client.logout()
#         response = self.client.post('/api/v1/register/', {'username': 'newuser', 'email': 'new@example.com', 'password': 'newpass'})
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def test_register_existing_user(self):
#         response = self.client.post('/api/v1/register/', {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpass'})
#         self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

#     def test_get_user_by_id_success(self):
#         response = self.client.get(f'/api/v1/users/{self.user.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_user_by_id_forbidden(self):
#         other_user = CustomUser.objects.create_user(username='otheruser', password='otherpass')
#         response = self.client.get(f'/api/v1/users/{other_user.id}/')
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

#     def test_get_card_by_uuid_success(self):
#         response = self.client.get(f'/api/v1/cards/{self.card.uuid}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_card_by_uuid_not_found(self):
#         random_uuid = uuid4()
#         response = self.client.get(f'/api/v1/cards/{random_uuid}/')
#         self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

#     def test_create_card_success(self):
#         response = self.client.post('/api/v1/cards/add/', {'title': 'New Card', 'content': 'New Content'})
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)

#     def test_create_card_invalid(self):
#         response = self.client.post('/api/v1/cards/add/', {'title': '', 'content': ''})
#         self.assertEqual(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

#     def test_get_user_cards(self):
#         response = self.client.get('/api/v1/cards/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_user_favourites(self):
#         self.card.is_favourite = True
#         self.card.save()
#         response = self.client.get('/api/v1/cards/favourites/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_csrf_token_view(self):
#         response = self.client.get('/api/v1/csrf/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_logout_user(self):
#         response = self.client.post('/api/v1/logout/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
