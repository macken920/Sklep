package pl.warapp.model.users;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import pl.warapp.model.Product;

@Entity
public class Orders {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private int quantity; // ilosc danego produktu
	private double price; // aktualna cena 1 jednostki produktu - ceny moga sie zmieniac wiec w histori musi byc cena zakupu produktu
	
	@ManyToMany
	private List<Product> product;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}
	
	
	

}
