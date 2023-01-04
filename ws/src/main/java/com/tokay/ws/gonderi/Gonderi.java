package com.tokay.ws.gonderi;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.tokay.ws.file.FileAttachment;
import com.tokay.ws.user.User;

import lombok.Data;

/**
 * @author tokay
 *
 */

@Data
@Entity
public class Gonderi {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(length = 1000)
	private String content;

	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;

	@ManyToOne
	private User user;

	@OneToOne(mappedBy = "gonderi", cascade = CascadeType.REMOVE)
	private FileAttachment fileAttachment;
}
