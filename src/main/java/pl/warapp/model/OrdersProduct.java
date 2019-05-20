package pl.warapp.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class OrdersProduct {
	
	@Id
	@GeneratedValue
	private Long id;
	
	
	@ManyToOne//tylko na 1 produkt bo musimy podac jego quantity
	private Product product;
	
	private int productQuantity; // ilosc danego produktu

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(int productQuantity) {
		this.productQuantity = productQuantity;
	}
	
	
	

}
