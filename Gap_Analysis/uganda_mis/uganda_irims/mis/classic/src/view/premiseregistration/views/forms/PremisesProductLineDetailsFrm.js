/**
 * Created by Softclans on 12/19/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.PremisesProductLineDetailsFrm', {
    extend: 'Admin.view.gmpapplications.views.forms.PremisesProductLineAbstractFrm',
    xtype: 'premisesproductlinedetailsfrm',
    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'textfield',
                fieldLabel: 'Block',
                name: 'manufacturingsite_block_no',
               
            }
        );
    }
});