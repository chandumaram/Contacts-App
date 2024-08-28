using Contactly.Data;
using Contactly.Models;
using Contactly.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Contactly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactlyDbContext _dbContext;
        public ContactsController(ContactlyDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public ResponseDTO GetAllContacts()
        {
            try
            {
                var contacts = _dbContext.Contacts.ToList();
                return new ResponseDTO { status = true, outPut = contacts };
            }
            catch (Exception ex)
            {
                return new ResponseDTO { status = false, message = ex.Message };
            }
        }

        [HttpGet]
        [Route("{id:guid}")]
        public ResponseDTO GetContactById(Guid id)
        {
            try
            {
                var contact = _dbContext.Contacts.Find(id);
                return new ResponseDTO { status = true, outPut = contact };
            }
            catch (Exception ex)
            {
                return new ResponseDTO { status = false, message = ex.Message };
            }
        }

        [HttpPost]
        public ResponseDTO AddContact(AddContactRequestDTO request)
        {
            try
            {
                var contact = request.Id == null ? null: _dbContext.Contacts.Find(new Guid(request.Id));
                if (contact is null)
                {
                    var newContact = new Contact
                    {
                        Id = Guid.NewGuid(),
                        Name = request.Name,
                        Email = request.Email,
                        Phone = request.Phone,
                        Favorite = request.Favorite
                    };

                    _dbContext.Contacts.Add(newContact);
                    _dbContext.SaveChanges();

                    return new ResponseDTO { status = true, message = "Contact added successfully.", outPut = newContact };

                }
                else
                {
                    contact.Name = request.Name;
                    contact.Email = request.Email;
                    contact.Phone = request.Phone;
                    contact.Favorite = request.Favorite;

                    _dbContext.Contacts.Update(contact);
                    _dbContext.SaveChanges();

                    return new ResponseDTO { status = true, message = "Contact updated successfully.", outPut = contact };

                }
            }
            catch (Exception ex)
            {
                return new ResponseDTO { status = false, message = ex.Message };
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public ResponseDTO DeleteContact(Guid id)
        {
            try
            {
                var contact = _dbContext.Contacts.Find(id);

                if (contact is not null)
                {
                    _dbContext.Contacts.Remove(contact);
                    _dbContext.SaveChanges();
                }

                return new ResponseDTO { status = true, message = "Contact deleted successfully." };
            }
            catch (Exception ex)
            {
                return new ResponseDTO { status = false, message = ex.Message };
            }
        }
    }
}
