/**
 * modal_order_wi
 * 
 * template of order modal with icons
 * 
 * @category	chunk
 * @internal    @overwrite true
 * @internal    @modx_category Формы
 * @internal    @installset sample
 */
<div class="modal fade" tabindex="-1" role="dialog" id="order">
	<div class="modal-dialog">
		<div class="modal-content">
			<form method="post" action="#" data-goal="form:zakaz" class="ajax">
				<button type="button" class="close icon-cancel" data-dismiss="modal"></button>
				<div class="modal-title">Сделать заказ</div>
				<div class="modal-body">
					<div class="form-group wi">
						<input type="text" name="name" class="form-control" placeholder="Ваше имя *">
						<i class="icon-user"></i>
					</div>

					<div class="form-group wi">
						<input type="text" name="phone" class="mask-phone form-control" placeholder="Контактый телефон *">
						<i class="icon-phone"></i>
					</div>
					
					<div class="form-group wi">
						<input type="text" name="email" class="form-control" placeholder="Email *">
						<i class="icon-envelope"></i>
					</div>
					
					<div class="text-xs-center">
						<input type="hidden" name="pid" value="[*id*]">
						<input type="hidden" name="formid" value="order">
						<button type="submit" class="btn btn-theme">Отправить</button>
					</div>

					{{policy_note}}
				</div>
			</form>
		</div>
	</div>
</div>
