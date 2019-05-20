package pl.warapp.model.users;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import pl.warapp.model.OrdersProduct;

@Entity
public class Orders {
	
	@Id
	@GeneratedValue
	private Long id;
	
	
	private double price; // cena calego zamowienia
	
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)//wszystkei zamowione produkty w danym orderze
	private List<OrdersProduct> ordersProduct;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public List<OrdersProduct> getOrdersProduct() {
		return ordersProduct;
	}

	public void setOrdersProduct(List<OrdersProduct> ordersProduct) {
		this.ordersProduct = ordersProduct;
	}


	
	
	

}
