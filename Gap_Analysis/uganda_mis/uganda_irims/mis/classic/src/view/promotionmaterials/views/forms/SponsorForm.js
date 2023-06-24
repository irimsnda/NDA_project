Ext.define('Admin.view.promotionmaterials.views.forms.SponsorForm', {
    extend: 'Ext.form.Panel',
    xtype: 'sponsorform',
	//viewModel:'promotionmaterialsviewmodel',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },

    items: [
	     
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
		{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
                    xtype: 'textfield',
                    name: 'name',
                   fieldLabel: 'Sponsor Name',
				   allowBlank:false
                   
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Contact Person',

            name: 'contact_person'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'TIN',
            name: 'tin_no'
        },
        {
	
		    allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
			allowBlank:false,
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            //readOnly: true,
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
			allowBlank:false,
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
           
            name: 'physical_address'
        },
        {
			allowBlank:false,
            xtype: 'textfield',
           
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
			allowBlank:false,
            xtype: 'textfield',
			
            fieldLabel: 'Telephone',
            name: 'telephone_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
			
            name: 'fax'
        },
        {
			allowBlank:false,
            xtype: 'textfield',
            fieldLabel: 'Email',
			
            name: 'email'
        },
        {
            xtype: 'textfield',
            
            fieldLabel: 'Website',
            name: 'website'
			
        }

    ],
	buttons: [
			{
				xtype: 'button',
				text: 'Save',
				ui: 'soft-purple',
				iconCls: 'x-fa fa-save',
				formBind: true,
				table_name: 'tra_promotionaladvert_personnel',
				storeID: 'promotionmaterialproductparticularstr',
				action_url: 'promotionmaterials/insertUpdateSponsorDetails',
				action:'save_sponsor_details'
				
			},
			{
				xtype: 'button',
				text: 'Clear',
				ui: 'soft-purple',
				iconCls: 'x-fa fa-close',
				handler: function () {
					this.up('form').getForm().reset();
				}
			}
      ]
});